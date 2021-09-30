package server

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	dockertypes "github.com/docker/docker/api/types"
	"github.com/docker/volumes-share/pkg/types"
	"github.com/labstack/echo/v4"
)

type PullRequest struct {
	Reference string `json:"reference"`
}

func (vs *volumeServer) pullVolume(c echo.Context) error {
	var request PullRequest
	if err := c.Bind(&request); err != nil {
		return err
	}
	ref := request.Reference
	name := c.Param("name")

	authEncoded := c.Request().Header.Get("X-Registry-Auth")
	authConfig := &dockertypes.AuthConfig{}

	if authEncoded != "" {
		authJSON := base64.NewDecoder(base64.URLEncoding, strings.NewReader(authEncoded))
		if err := json.NewDecoder(authJSON).Decode(authConfig); err != nil {
			// for a pull it is not an error if no auth was given
			// to increase compatibility with the existing api it is defaulting to be empty
			authConfig = &dockertypes.AuthConfig{}
		}
	}

	desc, err := vs.backend.Pull(c.Request().Context(), ref, name, types.VolumePullOpts{
		Resolver: createResolver(authConfig),
	})
	if err != nil {
		return err
	}

	fmt.Printf("%+v\n", desc)

	return c.JSON(200, "test")
}
