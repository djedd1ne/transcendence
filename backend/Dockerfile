FROM python:3.12-slim as base

COPY . /app/
WORKDIR /app

RUN pip install -r requirements.txt && chmod +x script.sh

CMD [ "sh", "./script.sh" ]
