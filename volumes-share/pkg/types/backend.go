package types

import (
	"context"

	"github.com/containerd/containerd/remotes"
)

type VolumePushOpts struct {
	Resolver remotes.Resolver
}

type VolumePullOpts struct {
}

type VolumesBacked interface {
	Push(ctx context.Context, volume string, opts VolumePushOpts) error
	Pull(ctx context.Context, volume string, opts VolumePullOpts) error
}
