FROM node:slim as base

COPY . /app/
WORKDIR /app
RUN chmod +x script.sh && npm install

CMD npm start
