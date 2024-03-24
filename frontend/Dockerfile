FROM debian:latest

RUN apt-get update && apt-get install -y \
		npm

COPY . /app/
WORKDIR /app
RUN chmod +x script.sh && npm install

CMD [ "sh", "./script.sh" ]
