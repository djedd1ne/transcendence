FROM node:21-alpine as base

COPY package.json /app/.
WORKDIR /app/.
RUN npm install

COPY . /app/.
CMD npm start
