FROM debian:latest

RUN apt-get update && apt-get install -y \
		python3 \
		python3-virtualenv

ENV PATH="/app/venv/bin:$PATH"

COPY --link . /app/
WORKDIR /app
RUN chmod +x script.sh && virtualenv venv && pip install -r requirements.txt
CMD /bin/bash -c "./script.sh"
