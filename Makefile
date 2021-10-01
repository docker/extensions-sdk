all: 
	cd swimmingwhale ; docker build -t simmingwhale .
	cd tailscale ; make plugin
	cd telepresence ; make plugin
	cd vm-ui-plugin ; make plugin
