# Docker Desktop plugins sample

This plugin is packaged as a Docker image, including:

- a service to run in Desktop VM
- a (basic) UI tab to be added in Desktop Dashboard

To publish plugin sample (multi-arch build and push to hub, do not allow overriding tags already published):

`make push-plugin tag=1.0`
