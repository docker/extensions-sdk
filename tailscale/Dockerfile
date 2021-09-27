FROM node:14.17-alpine3.13 AS client-builder

WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
# install
RUN yarn
COPY client /app/client

RUN yarn build

FROM debian:bullseye

WORKDIR /app

RUN apt-get update
RUN apt-get install -y wget tar iptables iproute2
ENV TSFILE=tailscale_1.14.3_amd64.tgz
RUN wget https://pkgs.tailscale.com/stable/${TSFILE} && \
    tar xzf ${TSFILE} --strip-components=1

COPY vm/start.sh .
RUN chmod +x start.sh

WORKDIR /
COPY vm/docker-compose.yaml .
COPY --from=client-builder /app/client/dist ui
COPY metadata.json .

CMD cat /metadata.json
