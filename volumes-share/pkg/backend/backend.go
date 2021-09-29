package backend

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/client"
	"github.com/docker/volumes-share/pkg/types"
)

type volumesBackend struct {
	c *client.Client
}

func New(c *client.Client) types.VolumesBacked {
	return &volumesBackend{
		c: c,
	}
}

func (vb *volumesBackend) Push(ctx context.Context, volume string, opts types.VolumePushOpts) error {
	return nil
}

func (vb *volumesBackend) Pull(ctx context.Context, volume string, opts types.VolumePullOpts) error {
	volumes, err := vb.c.VolumeList(ctx, filters.NewArgs())
	if err != nil {
		return err
	}

	for _, volume := range volumes.Volumes {
		fmt.Println(volume.Name)
	}

	return nil
}
