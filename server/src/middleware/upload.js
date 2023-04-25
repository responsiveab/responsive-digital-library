import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
//import dbConnectionURL from '../src/config/mongodb.config'

import {dbConnectionURL} from '../config/mongodb.config';
//const url = db.config.REMOTE_DB_URL

// Create new GridFsStorage instance
const storage = new GridFsStorage({
  url: dbConnectionURL.LOCAL_DB_URL,
  //url: 'mongodb://localhost/27017/db/data/files',
  // options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
            const fileName = file.originalname;
            //const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: fileName,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
  } 
});

// Create multer upload middleware
const upload = multer({ storage: storage });

export default upload;