import { Button, Stack, TextField, Typography } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { useState } from 'react';

export function App() {
  const ddClient = createDockerDesktopClient();
  const [backendInfo, setBackendInfo] = useState<string | undefined>();

  async function runExtensionBackend(inputText: string) {
    const result = await ddClient.extension.vm?.cli.exec('./hello.sh', [
      inputText,
    ]);
    setBackendInfo(result?.stdout);
  }

  return (
    <Stack
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <TextField
        placeholder="Enter your name"
        onChange={(event) => runExtensionBackend(event.target.value)}
      ></TextField>

      {backendInfo ? <Typography>{backendInfo}</Typography> : ''}
    </Stack>
  );
}
