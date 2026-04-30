#!/usr/bin/env bash
# Delete a user by editing the database directly.
# Run from the directory containing the docker-compose.yml of the running stack.
#
# A fresh one-shot container is launched (so memory isn't shared with the
# live web server) and joined to the mongo container's network namespace
# (so DNS doesn't matter — mongo is on 127.0.0.1 from inside).

set -e

read -rp "Enter user email: " email

MONGO_CID=$(docker compose ps -q mongo)
if [ -z "$MONGO_CID" ]; then
    echo "Error: mongo container is not running" >&2
    exit 1
fi

WEB_CID=$(docker compose ps -q web)
if [ -z "$WEB_CID" ]; then
    echo "Error: web container is not running" >&2
    exit 1
fi

WEB_IMAGE=$(docker inspect --format '{{.Config.Image}}' "$WEB_CID")

docker run --rm \
    --network="container:$MONGO_CID" \
    -e MONGO_HOSTNAME=127.0.0.1 \
    -e MONGO_PORT=27017 \
    -e MONGO_DB=responsive_library_db \
    -e DELETE_EMAIL="$email" \
    -w /usr/src/app/server \
    "$WEB_IMAGE" \
    node -e '
const { MongoClient } = require("mongodb");
const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT, DELETE_EMAIL } = process.env;
(async () => {
    const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const result = await client.db(MONGO_DB).collection("users").findOneAndDelete(
            { email: DELETE_EMAIL }
        );
        if (!result) {
            console.error(`No user found with email "${DELETE_EMAIL}".`);
            process.exit(1);
        }
        console.log(`Deleted user ${DELETE_EMAIL}.`);
    } finally {
        await client.close();
    }
})().catch(err => { console.error(err); process.exit(1); });
'
