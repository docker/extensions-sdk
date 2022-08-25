# Dear Moby Extension

![A screenshot of the Dear Moby Extension](/screenshots/dearmobyextension.png)

## What's this about?

Dear Moby is our [Youtube show](https://www.youtube.com/playlist?list=PLkA60AVN3hh_aBXzjqu13dupUV1JdFnjI) where Kat and [Shy](https://twitter.com/shyruparel) answer technical questions that are submitted by our Docker Community members. This extension takes those youtube episodes enables you to watch them from inside Docker Desktop.

## Requirements

To build this project you'll need to be running the latest version of [Docker Desktop](https://www.docker.com/products/docker-desktop/).

You'll also need to create an API key for the youtube v3 data API within the [google api console](https://console.cloud.google.com/apis/credentials). Add it to your local ENV as `REACT_APP_YOUTUBE_KEY`.

![A screenshot of the google console](/screenshots/googleconsole.png)

## How to install

### i. Using GitHub

#### Step 1. Clone the repository

```
 git clone https://github.com/docker/extensions-sdk/
 cd extensions/extensions-sdk/samples/dear-moby/
```

#### Step 2. Build the Docker Extension

Navigate into the cloned repository and run:

```
make install-extension
```

The above command builds the extension and asks if you'd like to install it if it's successful. Open up Docker Desktop to see the extension in action. The first time you run this extension it may take a while due to a lack of build cache.

To check that the extension has been installed successfully using the following CLI command:

```
 docker extension ls
```
![A screenshot of the  docker extension ls](/screenshots/extensionps.png)

#### Step 3. Update Docker Extensions

If you make code changes you can reinstall the extension with:

```
make update-extension
```

To debug the extension you can enable dev mode.

```
docker extension dev debug shy/dear-moby
```

If you'd like to run the extension locally and hot reload the UI you can do so with

```bash
docker extension dev ui-source shy/dear-moby http://localhost:3000/
npm start
```

