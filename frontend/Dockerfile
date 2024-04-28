FROM node:21-alpine as base

RUN apk update
WORKDIR /app/.
COPY package.json /app/.
RUN npm install

COPY . .
RUN chmod +x script.sh
CMD ["./script.sh"]
