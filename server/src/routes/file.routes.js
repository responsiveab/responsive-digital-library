import path from "path";
import express from "express";
import { upload } from "../middleware/upload.js";
import { bucket } from "../config/mongodb.config.js";
import auth from "../middleware/auth.js";


const fileRouter = express.Router();

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
        return res.status(500).send("Failed to download file.");
    }
});

fileRouter.post(
    "/upload",
    auth,
    upload.single("file"),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        try {
            const uploadStream = bucket.openUploadStream(req.file.originalname);
            uploadStream.end(req.file.buffer);
            await new Promise((resolve, reject) => {
                uploadStream.once("finish", resolve);
                uploadStream.once("error", reject);
            });
            res.send("file uploaded successfully.");
        } catch (err) {
            console.error("Upload failed:", err);
            res.status(500).send("file not uploaded");
        }
    },
    (error, req, res, next) => {
        if (error) {
            console.error("Upload middleware error:", error);
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
        return res.status(500).send("Failed to download file.");
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
