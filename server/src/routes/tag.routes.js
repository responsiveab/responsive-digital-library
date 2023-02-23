import express from 'express';
import Tag from '../models/tag.model';
import Book from '../models/book.model';
const tagRouter = express.Router();

// Get all Tags
tagRouter.get('/', (req, res, next) => {
    Tag.find({} , function(err, result){
        if(err){
            res.status(400).send({
                'success': false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data': result
        });
    });
});

// Add Single Tag
tagRouter.post("/", (req, res, next) => {
    let newTag = {
      name: req.body.name,
      slug: req.body.slug
    };
     Tag.create(newTag, function(err, result) {
      if(err){
        res.status(400).send({
            success: false,
            error: err.message
        });
      }
        res.status(201).send({
            success: true,
            data: result,
            message: "Tag created successfully"
        });
    });
  });

// Add Single Tag To Book
tagRouter.patch("/:book_id", (req, res, next) => {
    Book.findByIdAndUpdate(req.params.book_id, { $push: { tags: req.body.tag._id } }, { new: true, useFindAndModify: false },  function (err, result) {
        if(err){
            res.status(400).send({
               success: false,
               error: err.message
              });
        }
        res.status(200).send({
          success: true,
          data: result,
          message: "Book updated with tag successfully"
          });
    });
  });

export default tagRouter;