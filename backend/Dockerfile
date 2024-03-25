FROM python:3.12-slim as base

COPY requirements.txt /app/.
WORKDIR /app
RUN pip install -r requirements.txt

COPY . /app/.
RUN chmod +x script.sh
CMD [ "sh", "./script.sh" ]
