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

FROM debian:bullseye

RUN apt-get update
RUN apt-get install -y curl tar
RUN mkdir /darwin
RUN curl -fL https://app.getambassador.io/download/tel2/darwin/amd64/latest/telepresence -o /darwin/telepresence
RUN chmod a+x /darwin/telepresence

WORKDIR /
COPY --from=client-builder /app/client/dist ui
COPY metadata.json .

CMD cat /metadata.json
