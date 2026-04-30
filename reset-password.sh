#!/usr/bin/env bash
# Reset a user's password by editing the database directly.
# Run from the directory containing the docker-compose.yml of the running stack.
#
# A fresh one-shot container is launched (so memory isn't shared with the
# live web server) and joined to the mongo container's network namespace
# (so DNS doesn't matter — mongo is on 127.0.0.1 from inside).

set -e

read -rp "Enter user email: " email
read -rsp "Enter new password: " password
echo

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
    -e RESET_EMAIL="$email" \
    -e RESET_PASSWORD="$password" \
    -w /usr/src/app/server \
    "$WEB_IMAGE" \
    node -e '
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT, RESET_EMAIL, RESET_PASSWORD } = process.env;
(async () => {
    const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    const client = new MongoClient(url);
    try {
        await client.connect();
        const hash = await bcrypt.hash(RESET_PASSWORD, 10);
        const result = await client.db(MONGO_DB).collection("users").findOneAndUpdate(
            { email: RESET_EMAIL },
            { $set: { encrypted_password: hash } }
        );
        if (!result) {
            console.error(`No user found with email "${RESET_EMAIL}".`);
            process.exit(1);
        }
        console.log(`Password reset for ${RESET_EMAIL}.`);
    } finally {
        await client.close();
    }
})().catch(err => { console.error(err); process.exit(1); });
'
