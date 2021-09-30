package server

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/containerd/containerd/remotes"
	"github.com/containerd/containerd/remotes/docker"
	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/volumes-share/pkg/types"
	"github.com/labstack/echo/v4"
)

type PushRequest struct {
	Reference string `json:"reference"`
}

func (vs *volumeServer) pushVolume(c echo.Context) error {
	var request PushRequest
	if err := c.Bind(&request); err != nil {
		fmt.Println("ughughughu")
		return err
	}
	name := c.Param("name")

	fmt.Printf("%+v\n%s\n", request, name)

	authEncoded := c.Request().Header.Get("X-Registry-Auth")
	authConfig := &dockertypes.AuthConfig{}

	if authEncoded != "" {
		authJSON := base64.NewDecoder(base64.URLEncoding, strings.NewReader(authEncoded))
		if err := json.NewDecoder(authJSON).Decode(authConfig); err != nil {
			fmt.Println(err)
			return err
		}
	}

	err := vs.backend.Push(c.Request().Context(), request.Reference, name, types.VolumePushOpts{
		Resolver: createResolver(authConfig),
	})
	if err != nil {
		return err
	}

	return c.JSON(200, authEncoded)
}

func createResolver(authConfig *dockertypes.AuthConfig) remotes.Resolver {
	authorizer := docker.NewAuthorizer(nil, func(hostName string) (string, string, error) {
		return authConfig.Username, authConfig.Password, nil
	})

	return docker.NewResolver(docker.ResolverOptions{
		Authorizer: authorizer,
		PlainHTTP:  false,
	})
}
