FROM debian:latest

RUN apt-get update && apt-get install -y \
		postgresql 

ARG USERNAME=ssergiu
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG PGDATA=/usr/local/pgsql/data

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

RUN mkdir -p /usr/local/pgsql/lib
RUN mkdir -p /usr/local/pgsql/bin
RUN mkdir -p ${PGDATA}
RUN chown -R ssergiu /usr/local/pgsql
RUN chown -R ssergiu /var/run/postgresql
RUN mkdir -p /usr/local/share/man
USER $USERNAME
RUN ./usr/lib/postgresql/15/bin/initdb 
RUN ./usr/lib/postgresql/15/bin/pg_ctl start && ./usr/lib/postgresql/15/bin/createuser postgres -s && ./usr/lib/postgresql/15/bin/createdb django_db && ./usr/lib/postgresql/15/bin/pg_ctl stop
COPY --link pg_hba.conf $PGDATA/.
COPY --link postgresql.conf $PGDATA/.
CMD [ "bash", "-c", "/usr/lib/postgresql/15/bin/postgres" ]
