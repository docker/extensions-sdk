import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import {
  checkK8sConnection,
  getCurrentHostContext,
  listHostContexts,
  listNamespaces,
  setDockerDesktopContext,
} from "./helper/kubernetes";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string | undefined>();
  const ddClient = useDockerDesktopClient();

  return (
    <>
      <Typography variant="h3">Kuberntes Sample extension</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a sample Docker Extension that shows how to interact with a
        Kubernetes cluster by shipping the kubectl command line too to read the
        kubeconfig file from your host filesystem.
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={async () => {
                const result = await checkK8sConnection(ddClient);
                setResponse(result);
              }}
            >
              Check Kubernetes connection
            </Button>

            <Button
              variant="contained"
              onClick={async () => {
                const result = await setDockerDesktopContext(ddClient);
                setResponse(result);
              }}
            >
              Use "docker-desktop" context
            </Button>

            <Button
              variant="contained"
              onClick={async () => {
                const result = await getCurrentHostContext(ddClient);
                setResponse(result);
              }}
            >
              Get current host context
            </Button>

            <Button
              variant="contained"
              onClick={async () => {
                const result = await listHostContexts(ddClient);
                setResponse(result);
              }}
            >
              List contexts
            </Button>

            <Button
              variant="contained"
              onClick={async () => {
                const result = await listNamespaces(ddClient);
                setResponse(result as string);
              }}
            >
              List namespaces
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <TextField
            label="Output"
            sx={{ width: 480 }}
            disabled
            multiline
            variant="outlined"
            minRows={5}
            value={response ?? ""}
          />
        </Grid>
      </Grid>
    </>
  );
}
