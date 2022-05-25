package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"

	"github.com/docker/vm-service-extension/internal/socket"
)

var volumesRoot = flag.String("volumesRoot", "/var/lib/docker/volumes", "Root folder for volumes")

func main() {
	var socketPath = flag.String("socket", "/run/guest/volumes-service.sock", "Unix domain socket to listen on")
	var testPort = flag.Int("testPort", 0, "Test port to expose instead of socket")
	flag.Parse()
	unixSocket := "unix:" + *socketPath
	logrus.New().Infof("Starting listening on %s\n", unixSocket)
	router := echo.New()
	router.HideBanner = true

	startURL := ""

	if *testPort != 0 {
		startURL = fmt.Sprintf(":%d", *testPort)
	} else {
		ln, err := socket.ListenOn(unixSocket)
		if err != nil {
			log.Fatal(err)
		}
		router.Listener = ln
	}

	router.GET("/ls", listVolumes)
	router.GET("/version", getVersion)

	log.Fatal(router.Start(startURL))
}

func getVersion(ctx echo.Context) error {
	return ctx.JSON(http.StatusOK, "1.0")
}

func listVolumes(ctx echo.Context) error {
	files, err := ioutil.ReadDir(*volumesRoot)
	if err != nil {
		return internalError(ctx, err)
	}
	res := []string{}
	for _, file := range files {
		res = append(res, file.Name())
	}
	return ctx.JSON(http.StatusOK, res)
}

func internalError(ctx echo.Context, err error) error {
	logrus.Error(err)
	return ctx.JSON(http.StatusInternalServerError, HTTPMessageBody{Message: err.Error()})
}

type HTTPMessageBody struct {
	Message string
}
