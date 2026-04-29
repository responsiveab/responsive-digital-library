#!/usr/bin/env bash
# One-shot migration: walk every book, fetch any http(s) imgstr and replace
# it with a data URL so the document is self-contained. Missing or
# unreachable images fall back to the inline SVG placeholder, matching
# normalizeImgstr in server/src/routes/book.routes.js. Safe to re-run.
# Run from the directory containing the docker-compose.yml of the running stack.

docker compose exec -T web node -e '
const axios = require("axios");
const { MongoClient } = require("mongodb");

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" viewBox="0 0 128 192"><rect width="128" height="192" fill="gainsboro" stroke="lightgray"/><text x="64" y="92" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">Ingen</text><text x="64" y="108" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">omslagsbild</text></svg>`;
const COVER_MISSING_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(SVG)}`;

async function fetchAsDataUrl(url) {
    try {
        const res = await axios.get(url, {
            responseType: "arraybuffer",
            timeout: 10000,
            maxContentLength: 5 * 1024 * 1024,
            maxBodyLength: 5 * 1024 * 1024,
        });
        const contentType = res.headers["content-type"] || "image/jpeg";
        const base64 = Buffer.from(res.data).toString("base64");
        return `data:${contentType};base64,${base64}`;
    } catch {
        return null;
    }
}

(async () => {
    const { MONGO_HOSTNAME, MONGO_DB, MONGO_PORT } = process.env;
    const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    const client = new MongoClient(url);
    await client.connect();
    try {
        const books = client.db(MONGO_DB).collection("books");
        const total = await books.countDocuments();
        console.log(`Migrating ${total} books...`);

        const cursor = books.find({}, { projection: { _id: 1, imgstr: 1 } });
        let migrated = 0, fallback = 0, kept = 0, processed = 0;
        for await (const book of cursor) {
            let next;
            if (!book.imgstr || typeof book.imgstr !== "string") {
                next = COVER_MISSING_IMG;
                fallback++;
            } else if (book.imgstr.startsWith("data:")) {
                kept++;
                processed++;
                if (processed % 25 === 0) console.log(`  ${processed}/${total}`);
                continue;
            } else if (/^https?:\/\//i.test(book.imgstr)) {
                const dataUrl = await fetchAsDataUrl(book.imgstr);
                if (dataUrl) {
                    next = dataUrl;
                    migrated++;
                } else {
                    next = COVER_MISSING_IMG;
                    fallback++;
                    console.warn(`  fallback for ${book._id}: ${book.imgstr}`);
                }
            } else {
                next = COVER_MISSING_IMG;
                fallback++;
            }
            await books.updateOne({ _id: book._id }, { $set: { imgstr: next } });
            processed++;
            if (processed % 25 === 0) console.log(`  ${processed}/${total}`);
        }
        console.log(`Done. migrated=${migrated} fallback=${fallback} kept=${kept} total=${processed}`);
    } finally {
        await client.close();
    }
})().catch(err => { console.error(err); process.exit(1); });
'
