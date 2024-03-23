FROM debian:latest 

RUN apt-get update && apt-get install -y \
		postgresql 

ARG USERNAME=ssergiu
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG PGDATA=/usr/local/pgsql/data
ARG PATH=/usr/local/pgsql/bin:/usr/lib/postgresql/15/bin:$PATH
ENV PGDATA=$PGDATA
ENV PATH=$PATH

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

RUN mkdir -p /usr/local/pgsql/lib
RUN mkdir -p /usr/local/pgsql/bin
RUN mkdir ${PGDATA}
RUN chown -R ssergiu /usr/local/pgsql
RUN chown -R ssergiu /var/run/postgresql
RUN mkdir -p /usr/local/share/man
USER $USERNAME
RUN initdb
RUN pg_ctl start && createuser postgres -s && createdb django_db && pg_ctl stop
COPY --link pg_hba.conf $PGDATA/.
COPY --link postgresql.conf $PGDATA/.
CMD [ "bash", "postgres" ]
