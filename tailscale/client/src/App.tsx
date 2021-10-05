import React, { useState, useEffect } from 'react';

// Container
export interface Container {
  Names: string[];
  Ports: Port[];
}

export interface Port {
  PublicPort: number;
  Type: string;
}

// TailscaleStatusResponse
export interface TailscaleStatusResponse {
  BackendState: string; // e.g. "Running", "Stopped", "NeedsLogin", etc.
  Self: Self;
}

export interface Self {
  DNSName: string;
  TailscaleIPs: string[];
}

export function App() {
  const [status, setStatus] = useState<TailscaleStatusResponse>();
  const [containers, setContainers] = useState<Container[]>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (status == undefined) {
      updateStatus();
      listContainers();
    }
  }, [status]); // Only re-run the effect if Tailscale status changes

  function connect() {
    console.log(`connecting with token ${token}`);
    window.ddClient.backend
      .execInContainer(
        'tailscale_service',
        `/app/tailscale up --authkey ${token}`,
      )
      .then(() => updateStatus());
  }

  function disconnect() {
    console.log(
      `Disconnects from Tailscale. When disconnected, you cannot reach devices over Tailscale.`,
    );
    window.ddClient.backend
      .execInContainer('tailscale_service', `/app/tailscale down`)
      .then(() => setStatus(undefined));
  }

  function logout() {
    console.log(
      `Log out disconnects from Tailscale and expires the current log in. The next time you run tailscale up, you'll need to reauthenticate your device.`,
    );
    window.ddClient.backend
      .execInContainer('tailscale_service', `/app/tailscale logout`)
      .then(() => setStatus(undefined));
  }

  function updateStatus() {
    window.ddClient.backend
      .execInContainer('tailscale_service', `/app/tailscale status -json`)
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

  function PrintTableHeaders() {
    return (
      <tr key="headers">
        {['Container', 'Published ports', 'Tailscale URL', 'Tailscale IP'].map(
          (h) => (
            <td key={h}>{h}</td>
          ),
        )}
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
        <h1>Containers and teams, connected in one seamless experience.</h1>
        <h2>
          We bring containers and teams closer, connecting them under a secure
          private network, powered by Tailscale.
        </h2>
        <h4>
          Your containers will be visible only to other devices on the same
          Tailscale network.
        </h4>
      </div>
      <div>
        {(status === undefined ||
          status.BackendState == 'Stopped' ||
          status.BackendState == 'NoState' ||
          status.BackendState == 'NeedsLogin') && (
          <React.Fragment>
            <label>
              Tailscale authentication token:
              <input
                type="textarea"
                name="token"
                value={token}
                placeholder="tskey-3f6..."
                onChange={(e) => setToken(e.target.value)}
              />
            </label>

            <button type="button" onClick={() => connect()}>
              Connect
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

        <p>Status: {status?.BackendState}</p>
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
