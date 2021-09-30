FROM debian:bullseye

RUN apt-get update
RUN apt-get install -y curl tar
RUN mkdir /darwin
RUN curl -fL https://app.getambassador.io/download/tel2/darwin/amd64/latest/telepresence -o /darwin/telepresence
RUN chmod a+x /darwin/telepresence

COPY metadata.json .

CMD cat /metadata.json
