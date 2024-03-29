FROM python:3.12-slim as base

WORKDIR /app
COPY requirements.txt /app/.
RUN pip install -r requirements.txt

COPY . /app/.
RUN chmod +x script.sh
CMD [ "sh", "./script.sh" ]
