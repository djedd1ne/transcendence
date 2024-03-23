FROM debian:latest 

RUN apt-get update && apt-get install -y \
		postgresql 

ARG USERNAME=ssergiu
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG PGDATA=/usr/local/pgsql/data
ENV PATH=$PATH:/usr/local/pgsql/bin:/usr/lib/postgresql/15/bin

# Create the user 
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
	&& mkdir -p /usr/local/pgsql/lib && mkdir -p /usr/local/pgsql/bin \
	&& chown -R ssergiu /usr/local/pgsql \
	&& chown -R ssergiu /var/run/postgresql \
	&& mkdir -p /usr/local/share/man

USER $USERNAME
RUN initdb && pg_ctl start && createuser postgres -s && createdb django_db && pg_ctl stop
COPY --link pg_hba.conf $PGDATA/.
COPY --link postgresql.conf $PGDATA/.
CMD [ "/usr/lib/postgresql/15/bin/postgres" ]
