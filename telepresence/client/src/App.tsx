import React, { useState, useEffect } from 'react';

// Kubernetes service that can be intercepted by Telepresence
export interface Service {
  Name: string;
  Port: number;
  Intercepted: boolean;
}

export function App() {
  const [cluster, setCluster] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      list();
      setLoaded(true);
    }
  }, [services]); // Only re-run the effect if intercepted services changes

  function list() {
    console.log(
      `listing current intercepts (they could be intercepted or not)`,
    );

    window.ddClient
      .backend('telepresence')
      .execHostCmd(`telepresence list | grep 'intercept'`)
      .then((value: any) => {
        let services: Service[] = [];
        let strs = value.stdout.split('\n');

        for (var i = 0; i < strs.length; i++) {
          if (strs[i].length > 0) {
            let line = strs[i].split(':');
            let name = line[0].trimEnd();
            let description = line[1].trimEnd();

            const service: Service = {
              Name: name,
              Port: 8080, // TODO: Get port from kubectl?
              Intercepted: false,
            };

            if (description.includes('intercepted')) {
              service.Intercepted = true;
            }

            services.push(service);
          }
        }

        setServices(services);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function intercept(serviceName: string, port: number) {
    console.log(`intercepting service ${serviceName} on port ${port}`);
    window.ddClient
      .backend('telepresence')
      .execHostCmd(`telepresence intercept ${serviceName} --port ${port}`)
      .then((value: any) => {
        console.log(value.stdout);

        let updatedServices = services.map((s) => {
          if (s.Name == serviceName) {
            s.Intercepted = true;
          }
          return s;
        });

        console.log(updatedServices);

        setServices(updatedServices);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function leave(serviceName: string) {
    console.log(`stopping to intercept service ${serviceName}`);
    window.ddClient
      .backend('telepresence')
      .execHostCmd(`telepresence leave ${serviceName}`)
      .then((value: any) => {
        console.log(value.stdout);
        let updatedServices = services.map((s) => {
          if (s.Name == serviceName) {
            s.Intercepted = false;
          }
          return s;
        });

        console.log(updatedServices);

        setServices(updatedServices);
      })
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
        Kubernetes services:
        <ul>
          {services.map((s) => (
            <li>
              {s.Name}{' '}
              <button
                type="button"
                onClick={() => intercept(s.Name, s.Port)}
                disabled={s.Intercepted}
              >
                Intercept
              </button>{' '}
              <button
                type="button"
                onClick={() => leave(s.Name)}
                disabled={!s.Intercepted}
              >
                Leave
              </button>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
