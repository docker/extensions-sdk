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

LABEL org.opencontainers.image.title="Tailscale" \
    org.opencontainers.image.authors="Tailscale Inc." \
    com.docker.desktop.plugin.api.version="1.0.0-beta.1"

WORKDIR /app

RUN apt-get update
RUN apt-get install -y wget tar iptables iproute2
ENV TSFILE=tailscale_1.14.3_amd64.tgz
RUN wget https://pkgs.tailscale.com/stable/${TSFILE} && \
    tar xzf ${TSFILE} --strip-components=1 && \
    rm ${TSFILE}

WORKDIR /
COPY vm/docker-compose.yaml .
COPY --from=client-builder /app/client/dist ui
COPY tailscale.svg .
COPY metadata.json .

CMD /app/tailscaled --state=tailscaled.state --tun=userspace-networking