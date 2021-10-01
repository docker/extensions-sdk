EXTENSION:=
ifeq ($(OS),Windows_NT)
  EXTENSION:=.exe
endif

BINARY?=volumes-service
BUILDER=buildx-multi-arch

STATIC_FLAGS=CGO_ENABLED=0
#GIT_TAG?=$(shell git describe --tags --match "[0-9]*")
tag?=0.0.1
GIT_TAG?=$(tag)
LDFLAGS="-s -w -X github.com/docker/desktop-plugin/internal.Version=${GIT_TAG}"
GO_BUILD=$(STATIC_FLAGS) go build -trimpath -ldflags=$(LDFLAGS)

INFO_COLOR = \033[0;36m
NO_COLOR   = \033[m

bin: ## Build the binary for the current plarform
	@echo "$(INFO_COLOR)Building...$(NO_COLOR)"
	$(GO_BUILD) -o bin/volume-service ./vm-main

prepare-buildx: ## Create buildx builder for multi-arch build, if not exists
	docker buildx inspect $(BUILDER) || docker buildx create --name=$(BUILDER) --driver=docker-container --driver-opt=network=host

plugin: ## Build service image to be deployed as a desktop plugin
	docker build --tag=desktop-tailscale-plugin .

push-plugin: ## Build & Upload plugin image to hub. Do not push if tag already exists: make push-plugin tag=0.1
	docker pull docker/desktop-tailscale-plugin:$(tag) && echo "Failure: Tag already exists" || docker buildx build --push --builder=$(BUILDER) --platform=linux/amd64,linux/arm64 --build-arg TAG=${tag)} --tag=docker/desktop-tailscale-plugin:$(tag) .

help: ## Show this help
	@echo Please specify a build target. The choices are:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "$(INFO_COLOR)%-30s$(NO_COLOR) %s\n", $$1, $$2}'

.PHONY: bin plugin push-plugin help
