FROM node:14.17-alpine3.13 AS client-builder

WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
# install
RUN yarn
COPY client /app/client

RUN yarn
RUN yarn build

FROM golang:1.17-alpine AS term-builder
ENV CGO_ENABLED=0
RUN apk add --update make
COPY term term
COPY Makefile Makefile
RUN make term

FROM debian:bullseye as telepresence-builder

RUN apt-get update
RUN apt-get install -y curl tar
RUN mkdir /darwin
RUN curl -fL https://app.getambassador.io/download/tel2/darwin/amd64/latest/telepresence -o /darwin/telepresence
RUN chmod a+x /darwin/telepresence
RUN mkdir /windows
RUN curl -fL https://app.getambassador.io/download/tel2/windows/amd64/latest/telepresence.zip -o /windows/telepresence.zip
RUN curl -L "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/windows/amd64/kubectl.exe" -o /windows/kubectl.exe
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/amd64/kubectl"
RUN chmod a+x kubectl
RUN mv ./kubectl /darwin/kubectl

FROM scratch
WORKDIR /
COPY --from=client-builder /app/client/dist ui
COPY --from=telepresence-builder /darwin/telepresence /darwin/
COPY --from=telepresence-builder /windows/telepresence.zip /windows/
COPY --from=telepresence-builder /windows/kubectl.exe /windows/
COPY --from=telepresence-builder /darwin/kubectl /darwin/
COPY --from=term-builder go/term/build/darwin/term /darwin/

COPY telepresence-win-install.ps1 /windows
COPY metadata.json .
