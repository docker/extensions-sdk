package main

import (
	"flag"

	"github.com/docker/docker/client"
	"github.com/docker/volumes-share/pkg/backend"
	"github.com/docker/volumes-share/pkg/server"
	"github.com/docker/volumes-share/pkg/socket"
	"github.com/sirupsen/logrus"
)

func main() {
	var socketPath = flag.String("socket", "/run/guest/volumes-share.sock", "Unix domain socket to listen on")
	flag.Parse()
	unixSocket := "unix:" + *socketPath

	ln, err := socket.ListenOn(unixSocket)
	if err != nil {
		logrus.Fatal(err)
	}

	c, err := client.NewEnvClient()
	if err != nil {
		logrus.Fatal(err)
	}

	s := server.New(backend.New(c))

	if err := s.Start(ln); err != nil {
		logrus.Fatal(err)
	}
}
