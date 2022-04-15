---
title: Docker extension design
description: Docker extension design
keywords: Docker, extensions, design
---

Our Design System is currently being developed. In the meantime, here are some basic [UI guidelines](https://www.figma.com/file/U7pLWfEf6IQKUHLhdateBI/Docker-Design-Guidelines?node-id=1%3A28771) you can follow.

# Using Docker Material UI Theme

Docker Desktop's UI is written in React and [Material-UI](https://mui.com/). We strongly recommend you adopt this combination in your extension as well.

Use our [Docker Material UI Theme](https://www.npmjs.com/package/@docker/docker-mui-theme) to easily replicate Docker Desktop's look & feel. We'll continue to release libraries and utilities targeting this combination.

To use [Docker's Material UI theme](https://www.npmjs.com/package/@docker/docker-mui-theme) with your extension, wrap your React app with our theme provider:

```typescript
import { DockerMuiThemeProvider } from "@docker/docker-mui-theme";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <DockerMuiThemeProvider>
      <CssBaseline />
      // Your extension app here
    </DockerMuiThemeProvider>
  );
}
```

# Design Principles

At Docker, we aim to build tools that integrate into a user's existing workflows rather than requiring them to adopt new ones. To that end, we recommend the design principles listed below.

## Clear Call-to-Actions

When you use call-to-actions (CTAs), use familiar terms that do not have an ambiguous meaning. Avoid using too many CTAs on one page, wherever possible. If you need to use multiple CTAs, ensure the hierarchy is conveyed through the use of primary and secondary actions.

Below is an example of the use of a primary (Save) and a secondary (Cancel) button.

![UI Extension](images/cta-example.png)

## Use the UI

The advantage of Docker Desktop compared to the CLI is the opportunity to provide rich information to users. Make use of this interface as much as possible. Avoid embedding terminal windows if they are not necessary.

## Build native features

Try to avoid scenarios where the user is redirected to a web page to configure settings or view information, for example. Build features natively wherever possible to ensure a seamless experience for users.

## Break down complicated flows into steps

If a flow is too complicated or the concept is abstract, break down the flow into multiple steps with one simple call-to-action in each step. This helps when onboarding novice users to your extension. Furthermore, try to provide contextual help instead of redirecting the user to elaborate documentation.

## Visibility of Status

Ensure the current status of the extension is always made visible and clear to users. This helps users feel in control and know what steps they have to take in order to reach their intended outcome. An example of a status could be “[Extension- name] is connecting to the remote cluster.”

## User-friendly messages

When you show messages to the user, for example when an error occurs, avoid the use of detailed technical messages that rely on understanding low-level details. Use simple and concise messages with possible next steps so that a user knows how to remedy the situation.
