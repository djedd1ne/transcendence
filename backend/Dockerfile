FROM python:3.12-slim as base

COPY . /app/
WORKDIR /app
RUN chmod +x script.sh && pip install -r requirements.txt
CMD [ "sh", "./script.sh" ]
