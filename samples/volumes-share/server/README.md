$ Volumes share server

This server runs inside the Docker Desktop VM. It exposes itself on the
`volume-share.sock` socket.

The server has two endpoints:

## Push

URL

```
POST /volumes/:name/push
```

Body:

```
{
    reference: string
}
```

## Pull

URL

```
POST /volumes/:name/pull
```

Body:

```
{
    reference: string
}
```

To test it, run `make install` in this directory. You can then use the client.
