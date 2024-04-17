FROM node:21-alpine as base

RUN apk update && apk add vim
WORKDIR /app/.
COPY package.json /app/.
RUN npm install

COPY . /app/.
CMD npm start
