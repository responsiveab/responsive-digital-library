import express from 'express';
import Book from '../models/book.model';
const bookRouter = express.Router();

// Get all Books
bookRouter.get('/', (req, res, next) => {
  Book.find({} , function(err, result){
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

// Get Single Book
bookRouter.get("/:book_id", (req, res, next) => {
    Book.findById(req.params.book_id, function (err, result) {
        if(err){
             res.status(400).send({
               success: false,
               error: err.message
             });
        }
        res.status(200).send({
            success: true,
            data: result
        });
     });
});

// Add Single Book
bookRouter.post("/", (req, res, next) => {
  let newBook = {
    _id: req.body.id,
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    shelf: 'H1',      // COMMENT: Hardcoded for now, since this
                      // behaviour isnt implemented yet
    category: req.body.category,
    language: req.body.language,
    publisher: req.body.publisher,
    published: req.body.date,
    imgstr: req.body.img,
    borrower: "Ingen", //COMMENT: Hardcoded for now.
    borrowed: false,  // COMMENT: Hardcoded for now, since this
    digital: false,   // behaviour isnt implemented yet
  };
   Book.create(newBook, function(err, result) {
    if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
    }
      res.status(201).send({
        success: true,
        data: result,
        message: "Book created successfully"
      });
  });
});

// Edit Single Book
bookRouter.patch("/:book_id", (req, res, next) => {
  let fieldsToUpdate = req.body;
  Book.findByIdAndUpdate(req.params.book_id,{ $set: fieldsToUpdate }, { new: true },  function (err, result) {
      if(err){
          res.status(400).send({
             success: false,
             error: err.message
            });
      }
      res.status(200).send({
        success: true,
        data: result,
        message: "Book updated successfully"
        });
  });
});

// Delete Single Book
bookRouter.delete("/:book_id", (req, res, next) => {
  Book.findByIdAndDelete(req.params.book_id, function(err, result){
      if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
      }
    res.status(200).send({
      success: true,
      data: result,
      message: "Book deleted successfully"
    });
  });
});

export default bookRouter;