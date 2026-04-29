#!/usr/bin/env bash
# Reset a user's password by editing the database directly.
# Run from the directory containing the docker-compose.yml of the running stack.

read -rp "Enter user email: " email
read -rsp "Enter new password: " password
echo

RESET_EMAIL="$email" RESET_PASSWORD="$password" \
docker compose exec -T -e RESET_EMAIL -e RESET_PASSWORD web node -e '
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
