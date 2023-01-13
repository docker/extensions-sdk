import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";

const client = createDockerDesktopClient();

const client_id = "xxxx";
const client_secret = "xxxx";

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const ddClient = useDockerDesktopClient();

  const queryParams = new URLSearchParams(window.location.search);
  console.log("query: " + queryParams.toString());

  if (!loggedIn && queryParams.get("code")) {
    console.log("processing POST with code " + queryParams.get("code"));
    const requestOptions = {
      method: "POST",
    };
    fetch(
      `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${queryParams.get(
        "code"
      )}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        setLoggedIn(true);
        setResponse(data);
      });
  }

  const login = async () => {
    ddClient.host.openExternal(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`
    );
  };

  return (
    <>
      <Typography variant="h3">Docker extension Oauth demo</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This is a basic page using OAuth to login in using GitHub OAuth as an
        example.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will trigger a login flow and retrieve a
        GitHub authentication token once the user is authenticated.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={login} disabled={loggedIn}>
          {loggedIn ? "You're looged in" : "Login"}
        </Button>
        <TextField
          label="Oauth response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ""}
        />
      </Stack>
    </>
  );
}
