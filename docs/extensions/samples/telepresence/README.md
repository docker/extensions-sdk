Build plugin

```cli
make plugin-image tag=0.1
```

Install plugin

```cli
docker desktop plugin install felipecruz/desktop-telepresence-plugin:0.1
```

List plugins

```cli
docker desktop plugin ls
```

Remove plugin

```cli
docker desktop plugin rm telepresence
```

## Deploy sample app

```cli
kubectl create deployment go-http-server --image felipecruz/go-http-server
kubectl expose deployment go-http-server --port 8080 --target-port 8080
```

After connecting to the cluster with Telepresence, check you can reach the app from your host:

```cli
curl go-http-server.default:8080
Hello World!
```
