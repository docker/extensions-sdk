import { useState } from 'react';

export function App() {
  const [status, setStatus] = useState('Not connected');
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
      .execInContainer('tailscale_service', `/app/tailscale status`)
      .then((value: any) => {
        setStatus(value.stdout);
      })
      .catch((err: Error) => {
        console.log(err);
        setStatus('Logged out');
      });
  }

  return (
    <div>
      <h1>Connect your Docker Desktop containers to your Tailscale network</h1>

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
      <p>Status: {status}</p>
    </div>
  );
}
