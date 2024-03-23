FROM debian:latest

RUN apt-get update && apt-get install -y \
		npm

COPY --link . /app/
WORKDIR /app
RUN chmod +x script.sh
RUN npm install

CMD [ "bash", "./script.sh" ]
