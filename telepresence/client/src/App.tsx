import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// Kubernetes service that can be intercepted by Telepresence
export interface Service {
  Name: string;
  Intercepted: boolean;
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export function App() {
  const classes = useStyles();
  const [services, setServices] = useState<Service[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<string>('default');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any) => {
    listServices(event.target.value);
    setSelectedNamespace(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (!loaded) {
      getNamespaces();
      listServices(selectedNamespace);
      setLoaded(true);
    }
  }, [services, namespaces]); // Only re-run the effect if intercepted services changes

  function getNamespaces() {
    window.ddClient
      .execHostCmd(`kubectl get ns | cut -d' ' -f1 | tail -n +2`) // return just the names
      .then((value: any) => {
        let namespaces = value.stdout.split('\n');
        namespaces.pop(); // remove empty entry
        setNamespaces(namespaces);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function listServices(namespace: string) {
    if (namespace == '') {
      namespace = 'default';
    }

    console.log(
      `listing current intercepts (they could be intercepted or not)`,
    );

    window.ddClient
      .execHostCmd(`telepresence list -n ${namespace} | grep 'intercept'`)
      .then(async (value: any) => {
        let services: Service[] = [];
        let strs = value.stdout.split('\n');

        for (var i = 0; i < strs.length; i++) {
          if (strs[i].length > 0) {
            let line = strs[i].split(':');
            let serviceName = line[0].trimEnd();
            let intercepted = line[1].trimEnd().includes('intercepted');

            const service: Service = {
              Name: serviceName,
              Intercepted: intercepted,
            };

            services.push(service);
          }
        }

        setServices(services);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function intercept(namespace: string, serviceName: string) {
    console.log(
      `intercepting service ${serviceName} on port 8081 on namespace ${namespace}`,
    );
    window.ddClient
      .execHostCmd(
        `telepresence intercept ${serviceName} --port 8081 -n ${namespace}`,
      )
      .then((value: any) => {
        console.log(value.stdout);
        let updatedServices = services.map((s) => {
          if (s.Name == serviceName) {
            s.Intercepted = true;
          }
          return s;
        });

        setServices(updatedServices);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function leave(namespace: string, serviceName: string) {
    console.log(`stopping to intercept service ${serviceName}}`);
    window.ddClient
      .execHostCmd(`telepresence leave ${serviceName}-${namespace}`)
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
        {console.log(namespaces)}
        Choose a Kubernetes namespace
        <FormControl className={classes.formControl}>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={selectedNamespace}
            onChange={handleChange}
          >
            {namespaces.map((namespace) => {
              return (
                <MenuItem key={namespace} value={namespace}>
                  {namespace}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      <div>
        Kubernetes services:
        <ul>
          {services.map((s) => (
            <li key={s.Name}>
              {s.Name}{' '}
              <button
                type="button"
                onClick={() => intercept(selectedNamespace, s.Name)}
                disabled={s.Intercepted}
              >
                Intercept
              </button>{' '}
              <button
                type="button"
                onClick={() => leave(selectedNamespace, s.Name)}
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
