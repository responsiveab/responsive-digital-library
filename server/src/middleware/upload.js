import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import { dbConnectionURL, bucket } from "../config/mongodb.config";

// Create new GridFsStorage instance
const storage = new GridFsStorage({
    url: dbConnectionURL.LOCAL_DB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const fileName = file.originalname;
            const fileInfo = {
                filename: fileName,
                bucketName: "newBucket",
            };
            resolve(fileInfo);
        });
    },
});

// Create multer upload middleware
const upload = multer({ storage: storage });

export { upload, bucket };
//export default upload;
