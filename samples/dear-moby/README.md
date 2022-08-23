# Dear Moby Extension

![A screenshot of the Dear Moby Extension](/dear-moby/screenshots/dearmobyextension.png)

Dear Moby is our [Youtube show](https://www.youtube.com/playlist?list=PLkA60AVN3hh_aBXzjqu13dupUV1JdFnjI) where Kat and [Shy](https://twitter.com/shyruparel) answer technical questions that are submitted by our Docker Community members. This extension takes those youtube episodes enables you to watch them from inside Docker Desktop.

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
docker build -t dear-moby .
```

The above command generates a Docker image.


#### Step 3. Install Docker Extensions


To install the extension in Docker Desktop, run:

```
docker extension install dear-moby
```

If you make code changes you can reinstall the extension with:

```
docker extension update dear-moby
```

#### Step 4. List the Extension

 You can also check that the extension has been installed successfully using the following CLI command:

```
 docker extension ls
```
