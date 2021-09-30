package backend

import (
	"archive/tar"
	"compress/gzip"
	"context"
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/containerd/containerd/log"
	"github.com/containerd/containerd/remotes"
	"github.com/docker/volumes-share/pkg/types"
	ocispec "github.com/opencontainers/image-spec/specs-go/v1"
	"github.com/sirupsen/logrus"
	orascontent "oras.land/oras-go/pkg/content"
	"oras.land/oras-go/pkg/oras"
)

func (vb *volumesBackend) Push(ctx context.Context, ref string, volume string, opts types.VolumePushOpts) error {
	dir, err := ioutil.TempDir("/tmp", volume)
	if err != nil {
		return err
	}

	archive := filepath.Join(dir, archiveName)

	if err := dirTar(filepath.Join(volumesPath, volume, "_data"), archive); err != nil {
		return err
	}
	defer os.Remove(archive)

	return push(ctx, ref, dir, opts.Resolver)
}

func dirTar(path string, dest string) error {
	pr, pw := io.Pipe()
	w := gzip.NewWriter(pw)

	go func() {
		tw := tar.NewWriter(w)

		_ = filepath.Walk(path, func(filePath string, f os.FileInfo, e error) error {
			if e != nil {
				return e
			}

			if !f.Mode().IsRegular() {
				return nil
			}

			header, err := tar.FileInfoHeader(f, f.Name())
			if err != nil {
				return err
			}

			header.Name = strings.TrimPrefix(strings.Replace(filePath, path, "", -1), string(filepath.Separator))

			err = tw.WriteHeader(header)
			if err != nil {
				return err
			}

			fi, err := os.Open(filePath)
			if err != nil {
				return err
			}

			if _, err := io.Copy(tw, fi); err != nil {
				return err
			}

			return fi.Close()
		})

		w.Close()
		pw.Close()
		tw.Close()
	}()

	f, err := os.Create(dest)
	if err != nil {
		return err
	}

	defer f.Close()

	_, err = io.Copy(f, pr)
	if err != nil {
		return err
	}

	return pr.Close()
}

func withMutedContext(ctx context.Context) context.Context {
	logger := logrus.New()
	logger.SetLevel(logrus.FatalLevel)
	logger.SetOutput(ioutil.Discard)
	return log.WithLogger(ctx, logrus.NewEntry(logger))
}

func push(ctx context.Context, ref string, dir string, resolver remotes.Resolver) error {
	logrus.Debugf("Pushing %s to %s\n", dir, ref)
	customMediaType := "application/vnd.unknown.layer.v1+txt"

	fileStore := orascontent.NewFileStore(dir)
	defer fileStore.Close()

	f, err := os.Create(filepath.Join(dir, "config.json"))
	if err != nil {
		return err
	}

	_, err = f.Write([]byte("{}"))
	if err != nil {
		return err
	}
	f.Close()

	config, err := fileStore.Add("config.json", "application/vnd.oci.image.config.v1+json", "config.json")
	if err != nil {
		return err
	}

	desc, err := fileStore.Add(archiveName, customMediaType, archiveName)
	if err != nil {
		return err
	}

	pushContents := []ocispec.Descriptor{desc}

	ctx = withMutedContext(ctx)
	desc, err = oras.Push(ctx, resolver, ref, fileStore, pushContents, oras.WithConfig(config))
	if err != nil {
		return err
	}

	logrus.Debugf("Pushed to %s with digest %s\n", ref, desc.Digest)

	return nil
}
