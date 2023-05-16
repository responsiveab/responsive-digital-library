import path from 'path';
import express from 'express';
const fileRouter = express.Router();
const auth = require("../middleware/auth");
import { upload, bucket } from '../middleware/upload'

fileRouter.get('/', async (req, res) => {
  const cursor = bucket.find()
  cursor.forEach(doc => console.log(doc))
  try {
     // Find all files in GridFS
    const files = await bucket.find().toArray();

    // Return the files as a response
    res.json(files);
      
      /*if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve the file details from the database' });
      }
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }*/

    /*bucket.openDownloadStreamByName(fileName).pipe(res);*/
    
  
    
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

fileRouter.post('/upload', auth, upload.single('file'), async (req, res) => {
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

fileRouter.get('/download', auth, async (req, res) => {
    const fileName = req.query.filename;
    bucket.openDownloadStreamByName(fileName).pipe(res);
    /*bucket.find({filename: fileName}, (err, file) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve the file details from the database' });
      }
      if (!file) {
        return res.status(404).json({ error: 'File not found' });
      }
    bucket.openDownloadStreamByName(fileName).pipe(res);
    
    }) */
  })

fileRouter.delete('/delete', auth, async (req, res) => {
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

