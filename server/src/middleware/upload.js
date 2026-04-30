import multer from "multer";

// Buffer the upload in memory; the route handler writes it into GridFS
// via the mongoose-managed bucket. Avoids multer-gridfs-storage, which
// is unmaintained and broken against the mongodb 6.x driver.
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 },
});

export { upload };
