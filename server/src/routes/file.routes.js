import path from "path";
import express from "express";
const fileRouter = express.Router();
const auth = require("../middleware/auth");
import { upload, bucket } from "../middleware/upload";

fileRouter.get("/", async (req, res) => {
    try {
        // Find all files in GridFS
        const files = await bucket.find().toArray();

        // Return the files as a response
        res.json(files);
    } catch (error) {
        res.status(400).send(
            "Error while getting list of files. Try again later."
        );
    }
});

fileRouter.get("/ebook", async (req, res) => {
    const fileName = req.query.filename;
    try {
        const file = await bucket.openDownloadStreamByName(fileName);
        file.on("error", () => {
            return res.status(404).send("File not found.");
        });
        file.pipe(res);
    } catch (err) {
        console.log(err);
        return es.status(500).send("Failed to download file.");
    }
});

fileRouter.post(
    "/upload",
    auth,
    upload.single("file"),
    async (req, res) => {
        try {
            res.send("file uploaded successfully.");
        } catch (error) {
            res.status(400).send("file not uploaded");
        }
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);

fileRouter.get("/download", auth, async (req, res) => {
    const fileName = req.query.filename;
    try {
        const file = await bucket.openDownloadStreamByName(fileName);
        file.on("error", () => {
            return res.status(404).send("File not found.");
        });
        file.pipe(res);
    } catch (err) {
        console.log(err);
        return es.status(500).send("Failed to download file.");
    }
});

fileRouter.delete("/delete", auth, async (req, res) => {
    const filename = req.query.filename;
    const documents = await bucket.find({ filename }).toArray();
    if (documents.length === 0) {
        return res.status(404).send("File not found");
    }
    documents.map((doc) => {
        bucket.delete(doc._id);
    });
    res.send("File deleted");
});

export default fileRouter;
