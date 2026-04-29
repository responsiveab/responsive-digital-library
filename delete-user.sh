#!/usr/bin/env bash
# Delete a user by editing the database directly.
# Run from the directory containing the docker-compose.yml of the running stack.

read -rp "Enter user email: " email

DELETE_EMAIL="$email" \
docker compose exec -T -e DELETE_EMAIL web node -e '
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
