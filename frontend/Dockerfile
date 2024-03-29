FROM node:21-alpine as base

WORKDIR /app/.
COPY package.json /app/.
RUN npm install

COPY . /app/.
CMD npm start
