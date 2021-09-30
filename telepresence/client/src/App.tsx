import React, { useState, useEffect } from 'react';

export function App() {
  const [cluster, setCluster] = useState<string>('');

  useEffect(() => {
    if (cluster == '') {
      connect();
    }
  }, [cluster]); // Only re-run the effect if Tailscale status changes

  function connect() {
    console.log(`connecting to remote Kubernetes cluster ${cluster}`);
    console.log(window.ddClient.backend('telepresence'));
    window.ddClient
      .backend('telepresence')
      .execHostCmd('telepresence list')
      .then((value: any) => console.log(value))
      .catch((err: Error) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <h1>Telepresence</h1>
        <h2>
          Debug your Kubernetes service locally, using your favorite debugging
          tool.
        </h2>
      </div>

      <div>
        Remote Kubernetes clusters:
        <ul>
          <li>Cluster 1</li>
          <li>Cluster 2</li>
          <li>Cluster 3</li>
        </ul>
      </div>

      <div>
        Containers:
        <ul>
          <li>Container 1</li>
        </ul>
      </div>
    </React.Fragment>
  );
}
