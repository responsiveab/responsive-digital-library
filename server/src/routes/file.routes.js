import path from 'path';
import express from 'express';
import File from '../models/file.model';
const fileRouter = express.Router();
import upload from '../middleware/upload'


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

// upload.single('file')
fileRouter.post('/upload', upload.single('file'), async (req, res) => {
   try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title: (title ? title : "no name"),
        description: (description ? description : "no description"),
        file_path: (path ? path : "no path"),
        file_mimetype: (mimetype ? mimetype : "no mimetype")
      });
      
      await file.save()
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

