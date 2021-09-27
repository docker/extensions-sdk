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
COPY client/src ui
COPY metadata.json .

CMD cat /metadata.json
