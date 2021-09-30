all: cli

cli:
	go build -o volumes-share .

run: cli
	@./volumes-share

image:
	docker build -t volumes-share .

install: image
	docker desktop plugin rm volumes-share
	docker desktop plugin install volumes-share

.PHONY: cli run image install
