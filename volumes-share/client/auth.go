package main

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"os"

	"github.com/docker/cli/cli/config"
	"github.com/docker/docker/api/types"
	registrytypes "github.com/docker/docker/api/types/registry"
	"github.com/docker/docker/client"
	"github.com/docker/docker/registry"
)

func resolveAuthConfig(ctx context.Context, index *registrytypes.IndexInfo) (types.AuthConfig, error) {
	configKey := index.Name

	if index.Official {
		cfgKey, err := electAuthServer(ctx)
		if err != nil {
			return types.AuthConfig{}, err
		}

		configKey = cfgKey
	}

	cfg := config.LoadDefaultConfigFile(os.Stderr)
	a, _ := cfg.GetAuthConfig(configKey)

	return types.AuthConfig(a), nil
}

func electAuthServer(ctx context.Context) (string, error) {
	c, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		return "", err
	}

	info, err := c.Info(ctx)
	if err != nil {
		return registry.IndexServer, nil
	}

	if info.IndexServerAddress == "" {
		return registry.IndexServer, nil
	}

	return info.IndexServerAddress, nil
}

func encodeAuthToBase64(authConfig types.AuthConfig) (string, error) {
	buf, err := json.Marshal(authConfig)
	if err != nil {
		return "", err
	}
	return base64.URLEncoding.EncodeToString(buf), nil
}
