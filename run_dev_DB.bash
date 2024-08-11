#!/bin/bash

CONTAINER_NAME="dev-db"

if [ "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]; then
  docker stop $CONTAINER_NAME

  docker rm $CONTAINER_NAME

  echo "Docker Script:Info: Container was found and removed. Starting new one..."
fi


if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport

    if [ -z "$DB_USER" ] || [ -z "$DB_PASS" ] || [ -z "$DB_NAME" ]; then
        echo "Docker Script:Error: Required environment variables are not set in .env file."
        exit 1
    fi

    docker run \
    -p 5432:5432 \
    --name $CONTAINER_NAME \
    -e POSTGRES_USER="$DB_USER" \
    -e POSTGRES_PASSWORD="$DB_PASS" \
    -e POSTGRES_DB="$DB_NAME" \
    -d postgres \

    echo "Docker Script:Info: DB is running..."
else
    echo "Docker Script:Error: .env file not found."
    exit 1
fi