import React from 'react';
import { Box, Button } from '@mui/material';

export function App() {
  function sayHello() {
    alert('Hello, World!');
  }

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      alignItems="center"
      height="100vh">
      <Button variant="contained" onClick={sayHello}>Click me!</Button>
    </Box>
  );
}
