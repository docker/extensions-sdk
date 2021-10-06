# volumes-share-client

This is a client cli for volume share.

## Pushing a volume

Run

```shell
$ ./volumes-share-client push VOLUME REFERENCE
```

For example, if there is a volume named `my-volume` to push it to
`rumpl/volume:1.0.0` you can run `./volumes-share-client push rumpl/volume:1.0.0 my-volume`

To create a new volume named `my-pulled-volume` with the contents of `rumpl/volume:1.0.0` you can run
`./volumes-share-client pull rumpl/volume:1.0.0 my-pulled-volume`.
