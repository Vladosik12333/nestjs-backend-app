#!/bin/bash

if [ -f .env ]; then
    set -o allexport
    source .env
    set +o allexport

    if [ -z "$DB_USER" ] || [ -z "$DB_PASS" ] || [ -z "$DB_NAME" ]; then
        echo "Error: Required environment variables are not set in .env file."
        exit 1
    fi

    docker run \
    -p 5432:5432 \
    --name dev-db \
    -e POSTGRES_USER="$DB_USER" \
    -e POSTGRES_PASSWORD="$DB_PASS" \
    -e POSTGRES_DB="$DB_NAME" \
    -d postgres \

    echo "Docker DB is running..."
else
    echo "Error: .env file not found."
    exit 1
fi