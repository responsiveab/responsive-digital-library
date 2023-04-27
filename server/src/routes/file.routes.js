import path from 'path';
import express from 'express';
import File from '../models/file.model';
const fileRouter = express.Router();
import { upload, bucket } from '../middleware/upload'
import fs from 'fs'

fileRouter.get('/', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

fileRouter.post('/upload', upload.single('file'), async (req, res) => {
   try {
      const { _id, title} = req.body;
      const { path, mimetype } = req.file;
      /*const file = new File({
        _id : (_id ? _id : "no id"),
        title: (title ? title : "no name"),
        file_path: (path ? path : "no path"),
        file_mimetype: (mimetype ? mimetype : "no mimetype")
      });
      await file.save()*

    
    /*
     fs.createReadStream('/Users/mj/Downloads/frryd-se.txt').
      pipe(bucket.openUploadStream(title, {
          chunkSizeBytes: 1048576
      }));*/
      
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send(":(");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

fileRouter.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

export default fileRouter;

