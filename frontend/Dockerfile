FROM debian:latest

RUN apt-get update && apt-get install -y \
		npm

COPY . /app/
WORKDIR /app
RUN chmod +x script.sh
RUN npm install

ENTRYPOINT /bin/bash -c "./script.sh"
