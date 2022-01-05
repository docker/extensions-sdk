import React, { useState, useEffect } from 'react';

// Login flow
// At startup, useEffect for [] runs the hostname command in the Host.
// We use that later, when calling "tailscale up" to set the hostname.
//
// When the User clicks the "Login with Browser" button, we call
// getLoginInfo() to run "tailscale up" and retrieve the AuthURL.
// Notably, "tailscale up" is still running in the Extension Container
// when getLoginInfo() returns.
//
// When loginInfo is set, useEffect calls doOpenBrowser() to launch a
// web browser in the Host. It also calls waitLoginComplete(), to watch
// for when "tailscale up" exits after the user clicks in the browser to
// authenticate the node.
//
// When waitLoginComplete() finishes (which happens when "tailscale up"
// finally prints out status and exits) it sets the status to undefined.
// useEffect calls updateStatus, which will determine that we are now
// logged in.

// Container
export interface Container {
  Names: string[];
  Ports: Port[];
}

export interface Port {
  PublicPort: number;
  Type: string;
}

// TailscaleStatusResponse: output of `tailscale status --json`
export interface TailscaleStatusResponse {
  BackendState: string; // e.g. "Running", "Stopped", "NeedsLogin", etc.
  Self: Self;
}

export interface Self {
  DNSName: string;
  TailscaleIPs: string[];
}

// TailscaleUpResponse: output of `tailscale up --json ...`
export interface TailscaleUpResponse {
  AuthURL: string; // e.g. https://login.tailscale.com/a/0123456789abcdef
  QR: string; // a DataURL-encoded QR code PNG of the AuthURL
}

export function App() {
  const [status, setStatus] = useState<TailscaleStatusResponse>();
  const [containers, setContainers] = useState<Container[]>();
  const [loginInfo, setLoginInfo] = useState<TailscaleUpResponse>();
  const [hostname, setHostname] = useState<string>();

  useEffect(() => {
    updateHostname();
  }, []); // runs once after initial render.

  useEffect(() => {
    if (status == undefined) {
      updateStatus();
      listContainers();
    }
  }, [status]); // Only re-run the effect if Tailscale status changes

  useEffect(() => {
    setStatus(undefined);
  }, [hostname]);

  useEffect(() => {
    if (loginInfo !== undefined) {
      waitLoginComplete();
      doOpenBrowser(loginInfo.AuthURL);
    }
  }, [loginInfo]);

  function disconnect() {
    console.log(
      `Disconnects from Tailscale, but keeps you logged in. When disconnected, you cannot reach devices over Tailscale.`,
    );
    window.ddClient.backend
      .execInVMExtension(`/app/tailscale down`)
      .then(() => setStatus(undefined));
  }

  function logout() {
    console.log(
      `Logs out from Tailscale. The next time you connect to Tailscale, you'll need to reauthenticate.`,
    );
    window.ddClient.backend
      .execInVMExtension(`/app/tailscale logout`)
      .then(() => setStatus(undefined));
  }

  function updateStatus() {
    window.ddClient.backend
      .execInVMExtension(`/app/tailscale status -json`)
      .then((value: any) => {
        let res: TailscaleStatusResponse = JSON.parse(value.stdout);
        setStatus(res);
      })
      .catch((err: Error) => {
        console.log(err);
        setStatus(undefined);
      });
  }

  function listContainers() {
    window.ddClient
      .listContainers()
      .then((value: Container[]) => {
        setContainers(value);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function updateHostname() {
    window.ddClient.execHostCmd('hostname').then((value: any) => {
      let h: string = value.stdout.trim();
      console.log(`Setting hostname to ${h}`);
      setHostname(h);
    });
  }

  // runs "tailscale up" in the extension container to obtain the login URL
  function getLoginInfo() {
    window.ddClient.backend
      .execInVMExtension(
        `/app/background-output.sh /app/tailscale up --hostname=${hostname}-docker-desktop --accept-dns=false --json --reset`,
      )
      .then((value: any) => {
        let res: TailscaleUpResponse = JSON.parse(value.stdout);
        console.log(res);
        setLoginInfo(res);
      })
      .catch((err: Error) => {
        console.log(err);
        setStatus(undefined);
      });
  }

  // starts a shell to wait for "tailscale up" to exit
  function waitLoginComplete() {
    window.ddClient.backend
      .execInVMExtension(`/app/wait-for-exit.sh`)
      .then((value: any) => {
        console.log(value.stdout);
        setStatus(undefined);
      })
      .catch((err: Error) => {
        console.log(err);
        setStatus(undefined);
      });
  }

  // start a browser in the host
  function doOpenBrowser(url: string) {
    window.ddClient
      .execHostCmd(`tsbrowser ${url}`)
      .then(() => setStatus(undefined));
  }

  function PrintTableHeaders() {
    return (
      <tr key="headers">
        {[
          'Container',
          'Published ports',
          'Tailscale machine details URL',
          'Tailscale IP',
        ].map((h) => (
          <td key={h}>{h}</td>
        ))}
      </tr>
    );
  }

  function DisplayTailscaleURLs(container: Container) {
    let tailscaleURL = '-';
    let tailscaleURLs: string[] = [];

    for (var i = 0; i < container.Ports.length; i++) {
      let port = container.Ports[i].PublicPort;
      if (!port) {
        continue;
      }

      if (status?.Self.DNSName && container.Ports.length > 0) {
        tailscaleURL =
          'http://' + status?.Self.DNSName.slice(0, -1) + ':' + port;
      } else if (
        status?.Self.TailscaleIPs &&
        status?.Self.TailscaleIPs.length > 0 &&
        container.Ports.length > 0
      ) {
        tailscaleURL = 'http://' + status?.Self.TailscaleIPs[0] + ':' + port;
      }

      tailscaleURLs.push(tailscaleURL);
    }

    return (
      <td key={'url-' + container.Names[0]}>
        {tailscaleURLs.length > 0 ? (
          tailscaleURLs.map((u) => <pre>{u}</pre>)
        ) : (
          <pre>-</pre>
        )}
      </td>
    );
  }

  function DisplayContainerPorts(container: Container) {
    let publishedPorts: string[] = [];

    for (var i = 0; i < container.Ports.length; i++) {
      let type = container.Ports[i].Type.toUpperCase();
      let port = container.Ports[i].PublicPort ?? '-';
      let publishedPort = '(' + type + ')' + ' ' + port;
      publishedPorts.push(publishedPort);
    }

    return (
      <td key={'ports-' + container.Names[0]}>
        {publishedPorts.length > 0 ? (
          publishedPorts.map((p) => <pre>{p}</pre>)
        ) : (
          <pre>-</pre>
        )}
      </td>
    );
  }

  function DisplayTailscaleIPs(container: Container) {
    if (status == undefined) {
      return;
    }

    return (
      <td key={'ip-' + container.Names[0]}>
        {status?.Self.TailscaleIPs.length > 0 ? (
          <pre>{status?.Self.TailscaleIPs[0]}</pre>
        ) : (
          <pre>-</pre>
        )}
      </td>
    );
  }

  function PrintTableRows() {
    if (containers == undefined) {
      return;
    }

    return (
      containers &&
      containers
        .filter(
          (c: Container) => c.Ports.filter((p) => p.PublicPort).length > 0,
        ) // only display containers that expose ports
        .map((container) => (
          <React.Fragment>
            <tr key={'ctr-row-' + container.Names[0]}>
              <td key={'ctr-name-' + container.Names[0]}>
                {container.Names[0].substring(1)}
              </td>

              {DisplayContainerPorts(container)}

              {status?.BackendState == 'Running' &&
                DisplayTailscaleURLs(container)}

              {status?.BackendState == 'Running' &&
                DisplayTailscaleIPs(container)}
            </tr>
          </React.Fragment>
        ))
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1>Containers in your Tailscale network</h1>
        <h2>Connect your Docker containers to your secure private network.</h2>
        <p>
          Tailscale connects your devices together, so you can access them on
          your own private network.
        </p>
        <p>
          Your containers will be visible only to other devices on the same
          Tailscale network, as permitted by
          <a href="https://login.tailscale.com/admin/acls">ACLs</a> in your
          network.
        </p>
      </div>
      <div>
        <p>Status: {status?.BackendState}</p>
        {(status === undefined ||
          status.BackendState == 'Stopped' ||
          status.BackendState == 'NoState' ||
          status.BackendState == 'NeedsLogin') &&
          hostname !== undefined && (
            <React.Fragment>
              <button type="button" onClick={() => getLoginInfo()}>
                Login with Browser
              </button>
            </React.Fragment>
          )}

        {status?.BackendState === 'Running' && (
          <button type="button" id="disconnect" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}

        {status?.BackendState === 'Running' && (
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            {PrintTableHeaders()}
            {PrintTableRows()}
          </thead>
        </table>
      </div>
    </div>
  );
}
