package backend

import (
	"archive/tar"
	"compress/gzip"
	"context"
	"io"
	"os"
	"path/filepath"

	"github.com/containerd/containerd/reference/docker"
	"github.com/docker/distribution/reference"
	"github.com/docker/docker/api/types/volume"
	"github.com/docker/volumes-share/pkg/types"
	ocispec "github.com/opencontainers/image-spec/specs-go/v1"
	orascontent "oras.land/oras-go/pkg/content"
	"oras.land/oras-go/pkg/oras"
)

func (vb *volumesBackend) Pull(ctx context.Context, ref string, name string, opts types.VolumePullOpts) (ocispec.Descriptor, error) {
	r, err := reference.ParseNormalizedNamed(ref)
	if err != nil {
		return ocispec.Descriptor{}, err
	}
	taggedReference := docker.TagNameOnly(r)
	customMediaType := "application/vnd.unknown.layer.v1+txt"

	_, err = vb.c.VolumeCreate(ctx, volume.VolumeCreateBody{
		Name: name,
		Labels: map[string]string{
			"ref": ref,
		},
	})
	if err != nil {
		return ocispec.Descriptor{}, err
	}

	volumePath := filepath.Join(volumesPath, name, "_data")

	fileStore := orascontent.NewFileStore(volumePath)
	defer fileStore.Close()

	allowedMediaTypes := []string{customMediaType}
	desc, _, err := oras.Pull(ctx, opts.Resolver, taggedReference.String(), fileStore, oras.WithAllowedMediaTypes(allowedMediaTypes))
	if err != nil {
		return ocispec.Descriptor{}, err
	}

	archive := filepath.Join(volumePath, archiveName)
	f, err := os.Open(archive)
	if err != nil {
		return ocispec.Descriptor{}, err
	}

	if err := untar(volumePath, f); err != nil {
		return ocispec.Descriptor{}, err
	}
	os.Remove(archive)

	return desc, nil
}

func untar(dst string, r io.Reader) error {
	zr, err := gzip.NewReader(r)
	if err != nil {
		return err
	}

	tr := tar.NewReader(zr)
	madeDir := map[string]bool{}

	for {
		header, err := tr.Next()

		switch {
		case err == io.EOF:
			return nil
		case err != nil:
			return err
		case header == nil:
			continue
		}

		target := filepath.Join(dst, header.Name)

		switch header.Typeflag {
		case tar.TypeDir:
			if _, err := os.Stat(target); os.IsNotExist(err) {
				if err := os.MkdirAll(target, 0755); err != nil {
					return err
				}
			}
		case tar.TypeReg:
			dir := filepath.Dir(target)

			if !madeDir[dir] {
				if err := os.MkdirAll(filepath.Dir(target), 0755); err != nil {
					return err
				}
				madeDir[dir] = true
			}

			f, err := os.Create(target)
			if err != nil {
				return err
			}

			if _, err := io.Copy(f, tr); err != nil {
				return err
			}

			f.Close()
		}
	}
}
