FROM debian:latest

RUN apt-get update && apt-get install -y \
		python3 \
		python3-virtualenv

COPY . /app/
WORKDIR /app
RUN chmod +x script.sh
RUN virtualenv venv
ENV PATH="/app/venv/bin:$PATH"
RUN pip install -r requirements.txt

ENTRYPOINT /bin/bash -c "./script.sh"

