FROM node:14.17-alpine3.13 AS client-builder

WORKDIR /app/client
# cache packages in layer
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
# install
RUN yarn
COPY client /app/client

RUN yarn build

WORKDIR /
COPY vm/docker-compose.yaml .
RUN mv /app/client/dist ui
COPY metadata.json .

CMD cat /metadata.json
