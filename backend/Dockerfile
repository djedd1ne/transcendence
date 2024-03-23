FROM debian:latest

RUN apt-get update && apt-get install -y \
		python3 \
		python3-virtualenv

ARG PATH=/app/venv/bin:$PATH
ENV PATH=$PATH

COPY --link . /app/
WORKDIR /app
RUN chmod +x script.sh && virtualenv venv && pip install -r requirements.txt
CMD [ "bash", "./script.sh" ]
