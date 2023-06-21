import express from "express";
import Tag from "../models/tag.model";
import Book from "../models/book.model";
const tagRouter = express.Router();

// Get all Tags
tagRouter.get("/", (req, res, next) => {
    Tag.find({}, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
        res.status(200).send({
            success: true,
            data: result,
        });
    });
});

// Get Single Tag
tagRouter.get("/:tag_id", (req, res, next) => {
    Tag.findById(req.params.tag_id, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
        res.status(200).send({
            success: true,
            data: result,
        });
    });
});

// Add Single Tag
tagRouter.post("/", (req, res, next) => {
    //TODO: Add auth
    let newTag = {
        _id: req.body.name,
    };
    Tag.create(newTag, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
        res.status(201).send({
            success: true,
            data: result,
            message: "Tag created successfully",
        });
    });
});

// Add Single Tag To Book
tagRouter.patch("/:book_id", (req, res, next) => {
    //TODO: Add auth
    Book.findByIdAndUpdate(
        req.params.book_id,
        { $push: { tags: req.body.tag._id } },
        { new: true, useFindAndModify: false },
        function (err, result) {
            if (err) {
                res.status(400).send({
                    success: false,
                    error: err.message,
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Book updated with tag successfully",
            });
        }
    );
});

// Delete Single Tag
tagRouter.delete("/:book_id/:tag_id", (req, res, next) => {
    //TODO: Add auth
    Book.findByIdAndUpdate(
        req.params.book_id,
        { $pull: { tags: req.params.tag_id } },
        { new: true, useFindAndModify: false },
        function (err, result) {
            if (err) {
                res.status(400).send({
                    success: false,
                    error: err.message,
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Tag removed from book successfully",
            });
        }
    );
    /*
  TODO: Below code causing error. Resolve
  Tag.findByIdAndDelete(req.params.tag_id, function(err, result){
      if(err){
        res.status(400).send({
          success: false,
          error: err.message
        });
      }
    res.status(200).send({
      success: true,
      data: result,
      message: "Tag deleted successfully"
    });
  });
  */
});

export default tagRouter;
