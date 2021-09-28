import { Console } from 'console';
import React, { useState } from 'react';

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
  BackendState: string; // e.g. "Running", "NeedsLogin", etc.
  Self: Self;
}

export interface Self {
  HostName: string;
  DNSName: string;
  TailscaleIPs: string[];
}

export function App() {
  const [status, setStatus] = useState<TailscaleStatusResponse>();
  const [containers, setContainers] = useState<Container[]>();
  const [token, setToken] = useState<string>();

  function connectTailscale() {
    console.log(`connecting with token ${token}`);
    window.ddClient
      .backend('tailscale')
      .execInContainer(
        'tailscale_service',
        `/app/tailscale up --authkey ${token}`,
      )
      .then(() => updateStatus());
  }

  function disconnectTailscale() {
    console.log(`disconnecting`);
    window.ddClient
      .backend('tailscale')
      .execInContainer('tailscale_service', `/app/tailscale down`)
      .then(() => updateStatus());
  }

  function logoutTailscale() {
    console.log(`disconnecting`);
    window.ddClient
      .backend('tailscale')
      .execInContainer('tailscale_service', `/app/tailscale logout`)
      .then(() => updateStatus());
  }

  function updateStatus() {
    window.ddClient
      .backend('tailscale')
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
    // Get Tailscale status in case we haven't
    if (status == undefined) {
      updateStatus();
    }

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
      <tr>
        {['Container', 'Published ports', 'Magic DNS', 'Tailscale IP'].map(
          (h) => (
            <td key={h}>{h}</td>
          ),
        )}
      </tr>
    );
  }

  function PrintTableRows() {
    if (containers == undefined) {
      return;
    }

    for (var i = 0; i < containers?.length; i++) {}

    return (
      containers &&
      containers.map((container) => (
        <React.Fragment>
          <td key={'ctr-name-' + container.Names[0]}>
            {container.Names[0].substring(1)}
          </td>

          {container.Ports.length > 0 ? (
            <td key={'port-' + container.Names[0]}>
              ({container.Ports[0].Type.toUpperCase()}){' '}
              {container.Ports[0].PublicPort}
            </td>
          ) : (
            console.log('No ports')
          )}

          {status?.Self.DNSName && container.Ports.length > 0 ? (
            <td key={'magic-dns-' + container.Names[0]}>
              {'http://' +
                status?.Self.DNSName.slice(0, -1) +
                ':' +
                container.Ports[0].PublicPort}
            </td>
          ) : (
            console.log('No Magic DNS')
          )}

          {status?.Self.TailscaleIPs && status?.Self.TailscaleIPs.length > 0 ? (
            <td key={'ip-' + container.Names[0]}>
              <pre>
                {status?.Self.TailscaleIPs[0]} {'\n'}
                {status?.Self.TailscaleIPs[1]}
              </pre>
            </td>
          ) : (
            console.log('No Tailscale IPs')
          )}
        </React.Fragment>
      ))
    );
  }

  return (
    <div>
      <h1>Connect your Docker Desktop containers to your Tailscale network</h1>
      <h2>
        Your containers will be visible only to other machines on the same
        Tailscale network.
      </h2>
      <label>
        Tailscale authentication token:
        <input
          type="textarea"
          name="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </label>
      <button type="button" onClick={() => connectTailscale()}>
        Connect
      </button>
      <button
        type="button"
        id="disconnect"
        onClick={() => disconnectTailscale()}
      >
        Disconnect
      </button>
      <button type="button" onClick={() => logoutTailscale()}>
        Logout
      </button>
      <button type="button" onClick={() => updateStatus()}>
        Refresh Status
      </button>
      <button type="button" onClick={() => listContainers()}>
        List containers
      </button>
      <p>Status: {status?.BackendState}</p>

      <table style={{ width: '100%' }}>
        <thead>
          {PrintTableHeaders()}
          {PrintTableRows()}
        </thead>
      </table>
    </div>
  );
}
