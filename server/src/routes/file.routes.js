import path from 'path';
import express from 'express';
const fileRouter = express.Router();
import { upload, bucket } from '../middleware/upload'

fileRouter.get('/', async (req, res) => {
  try {
    // TODO : Show all files
  
    const cursor = bucket.find({});
    cursor.forEach(doc => console.log(doc));
    
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

fileRouter.post('/upload', upload.single('file'), async (req, res) => {
   try {
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send("file not uploaded");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  });

fileRouter.get('/download', async (req, res) => {
  // TODO: No file found
    bucket.openDownloadStreamByName(req.query.filename)
    .pipe(res);
  })

fileRouter.delete('/delete', async (req, res) => {
  const filename = req.query.filename;
  const documents = await bucket.find({ filename }).toArray();
  if (documents.length === 0) {
   res.send('File not found');
  }
   documents.map((doc) => {
    bucket.delete(doc._id);
   })
   res.send("File deleted")
})

export default fileRouter;

