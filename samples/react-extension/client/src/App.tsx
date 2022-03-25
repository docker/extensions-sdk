import { Box, Button } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

export function App() {
  const ddClient = createDockerDesktopClient();

  function sayHello() {
    ddClient.desktopUI.toast.success('Hello, World!');
  }

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button variant="contained" onClick={sayHello}>
        Click me!
      </Button>
    </Box>
  );
}
