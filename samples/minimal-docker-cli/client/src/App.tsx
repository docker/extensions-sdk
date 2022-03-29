import { Button, Stack, Typography } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { useState } from 'react';

export function App() {
  const ddClient = createDockerDesktopClient();
  const [dockerInfo, setDockerInfo] = useState<any>(null);

  async function runDockerInfo() {
    const result = await ddClient.docker.cli.exec('info', [
      '--format',
      '"{{json .}}"',
    ]);
    setDockerInfo(result.parseJsonObject());
  }

  return (
    <Stack
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button variant="contained" onClick={runDockerInfo}>
        Get Docker Info
      </Button>

      {dockerInfo ? (
        <div>
          <Typography>Allocated CPUs: {dockerInfo?.NCPU}</Typography>
          <Typography>Allocated Memory: {dockerInfo?.MemTotal}</Typography>
        </div>
      ) : (
        ''
      )}
    </Stack>
  );
}
