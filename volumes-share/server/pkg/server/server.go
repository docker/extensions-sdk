package server

import (
	"net"

	"github.com/docker/volumes-share/pkg/types"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type VolumeServer interface {
	Start(listener net.Listener) error
}

type volumeServer struct {
	e       echo.Echo
	backend types.VolumesBacked
}

func New(b types.VolumesBacked) VolumeServer {
	return &volumeServer{
		e:       *echo.New(),
		backend: b,
	}
}

func (vs *volumeServer) Start(listener net.Listener) error {
	vs.e.Listener = listener

	vs.e.Use(middleware.Logger())
	vs.e.Use(middleware.Recover())

	vs.e.HideBanner = true

	vs.setupRoutes()

	return vs.e.Start("")
}

func (vs *volumeServer) setupRoutes() {
	vs.e.POST("/volumes/:name/push", vs.pushVolume)
	vs.e.POST("/volumes/:name/pull", vs.pullVolume)
}
