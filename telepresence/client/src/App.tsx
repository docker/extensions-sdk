import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// Telepersence intercept
export interface Intercept {
  Name: string;
  Intercepted: boolean;
  Port: string;
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
  const [intercepts, setIntercepts] = useState<Intercept[]>([]);
  const [k8sServices, setK8sServices] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [selectedNamespace, setSelectedNamespace] = useState<string>('default');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: any) => {
    listIntercepts(event.target.value);
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
      listIntercepts(selectedNamespace);
      listKubernetesServices(selectedNamespace);
      setLoaded(true);
    }
  }, [intercepts, namespaces]); // Only re-run the effect if intercepts change

  function getNamespaces() {
    window.ddClient
      .execHostCmd(
        `kubectl get namespaces --no-headers -o custom-columns=":metadata.name"`,
      ) // return just the names
      .then((value: any) => {
        let namespaces = value.stdout.split('\n');
        namespaces.pop(); // remove empty entry
        setNamespaces(namespaces);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function listKubernetesServices(namespace: string) {
    window.ddClient
      .execHostCmd(`kubectl get service -n ${namespace}`) // return just the names
      .then((value: any) => {
        let services = value.stdout.split('\n');
        services.pop(); // remove empty entry
        console.log(services);
        setK8sServices(services);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function listIntercepts(namespace: string) {
    if (namespace == '') {
      namespace = 'default';
    }

    console.log(
      `listing current intercepts (they could be intercepted or not)`,
    );

    window.ddClient
      .execHostCmd(`telepresence list -n ${namespace}`)
      .then(async (value: any) => {
        let intercepts: Intercept[] = [];
        let strs = value.stdout.split('\n');

        for (var i = 0; i < strs.length; i++) {
          if (strs[i].length > 0) {
            let line = strs[i].split(':');
            let interceptName = line[0].trimEnd();
            let intercepted = line[1].trimEnd().includes('intercepted');

            const intercept: Intercept = {
              Name: interceptName,
              Intercepted: intercepted,
              Port: '',
            };

            intercepts.push(intercept);
          }
        }

        setIntercepts(intercepts);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function intercept(namespace: string, interceptName: string, port: string) {
    console.log(
      `intercepting ${interceptName} on port ${port} on namespace ${namespace}`,
    );
    window.ddClient
      .execHostCmd(
        `telepresence intercept ${interceptName} --port ${port} -n ${namespace}`,
      )
      .then((value: any) => {
        console.log(value.stdout);
        let updatedIntercepts = intercepts.map((i) => {
          if (i.Name == interceptName) {
            i.Intercepted = true;
          }
          return i;
        });

        setIntercepts(updatedIntercepts);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function leave(namespace: string, interceptName: string) {
    console.log(`stopping to intercept ${interceptName}}`);
    window.ddClient
      .execHostCmd(`telepresence leave ${interceptName}-${namespace}`)
      .then((value: any) => {
        console.log(value.stdout);
        let updatedIntercepts = intercepts.map((i) => {
          if (i.Name == interceptName) {
            i.Intercepted = false;
          }
          return i;
        });
        setIntercepts(updatedIntercepts);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }

  function setPort(interceptName: string, port: string) {
    let updatedIntercepts = intercepts.map((i) => {
      if (i.Name == interceptName) {
        i.Port = port;
      }
      return i;
    });

    setIntercepts(updatedIntercepts);
  }

  function renderIntercept(i: Intercept) {
    return (
      <div>
        {i.Name}
        <form>
          <label>
            Port:
            <input
              type="text"
              placeholder="<local-port>[:<remote-port>]"
              size={25}
              onChange={(e) => setPort(i.Name, e.target.value)}
              disabled={i.Intercepted}
            />
          </label>
          <button
            type="button"
            onClick={() => intercept(selectedNamespace, i.Name, i.Port)}
            disabled={i.Intercepted || i.Port == ''}
          >
            Intercept
          </button>
          <button
            type="button"
            onClick={() => leave(selectedNamespace, i.Name)}
            disabled={!i.Intercepted}
          >
            Leave
          </button>
        </form>
      </div>
    );
  }

  function renderK8sServices() {
    return (
      k8sServices &&
      k8sServices.map((service) => (
        <React.Fragment>
          <p>{service}</p>
        </React.Fragment>
      ))
    );
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
        Intercepts:
        <ul>
          {intercepts.map((i) => (
            <li key={i.Name}>{renderIntercept(i)}</li>
          ))}
        </ul>
        <div style={{ margin: '50px' }}></div>
        <div>
          Kubernetes services:
          {renderK8sServices()}
        </div>
      </div>
    </React.Fragment>
  );
}
