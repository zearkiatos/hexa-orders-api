FROM mysql:latest

COPY ./docker/mysql /docker/mysql/
COPY ./docker/mysql-entrypoint.sh /docker/

EXPOSE 3306