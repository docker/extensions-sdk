package backend

import (
	"github.com/docker/docker/client"
	"github.com/docker/volumes-share/pkg/types"
)

const (
	archiveName = "archive.tar.gz"
	volumesPath = "/var/lib/docker/volumes"
)

type volumesBackend struct {
	c *client.Client
}

func New(c *client.Client) types.VolumesBacked {
	return &volumesBackend{
		c: c,
	}
}
