---
title: Docker extension design
description: Docker extension design
keywords: Docker, extensions, design
---

## Docker UI Kit

Our Design System is currently being developed. In the meantime, you will find some basic styles (color, typography) and components in this [Docker Extensions Styleguide](https://www.figma.com/file/U7pLWfEf6IQKUHLhdateBI/Docker-Design-Guidelines?node-id=1%3A28771). Using the components and styles as per the Docker Extensions Styleguide, ensures your extension meets the [level AA accessibility standard.](https://www.w3.org/WAI/WCAG2AA-Conformance)

<br>

## Using Docker Material UI Theme

Docker Desktop's UI is written in React and [Material-UI](https://mui.com/). We strongly recommend you adopt this combination in your extension as well.

Use our [Docker Material UI Theme](https://www.npmjs.com/package/@docker/docker-mui-theme) to easily replicate Docker Desktop's look & feel. We'll continue to release libraries and utilities targeting this combination.

To use Docker's Material UI theme with your extension, wrap your React app with our theme provider:

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
