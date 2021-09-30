import React from 'react';

export function App() {
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
