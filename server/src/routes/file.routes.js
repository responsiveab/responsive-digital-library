import path from 'path';
import express from 'express';
import File from '../models/file.model';
const fileRouter = express.Router();
import { upload, bucket } from '../middleware/upload'
import fs from 'fs'

fileRouter.get('/', async (req, res) => {
  try {
    // const files = await bucket.find({});
    const cursor = bucket.find({});
    for await (const doc of cursor) {
      res.send(doc)
    }
    
   /* const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);*/
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

fileRouter.post('/upload', upload.single('file'), async (req, res) => {
   try {
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send(":(");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  });

fileRouter.get('/download', async (req, res) => {
    /*const file = await bucket
      .find({
        filename: req}
        )
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404)
            .json({
              err: "no files exist"
            });
        }
        
        bucket.openDownloadStreamByName("receiver.m")
        .pipe(res);
    }); */
        res.attachment();
        // res.download();
        bucket.openDownloadStreamByName("TDDD79 Intervjuguide.pdf")
        .pipe(res);
})

export default fileRouter;

