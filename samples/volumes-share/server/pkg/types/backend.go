package types

import (
	"context"

	"github.com/containerd/containerd/remotes"
	ocispec "github.com/opencontainers/image-spec/specs-go/v1"
)

type VolumePushOpts struct {
	Resolver remotes.Resolver
}

type VolumePullOpts struct {
	Resolver remotes.Resolver
}

type VolumesBacked interface {
	Push(ctx context.Context, ref string, volume string, opts VolumePushOpts) error
	Pull(ctx context.Context, ref string, volume string, opts VolumePullOpts) (ocispec.Descriptor, error)
}
