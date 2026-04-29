import express from "express";
import Tag from "../models/tag.model.js";
import Book from "../models/book.model.js";
const tagRouter = express.Router();

// Get all Tags — derived from the tags actually used on books, so the list
// stays accurate regardless of whether Tag-collection writes happened.
tagRouter.get("/", async (req, res, next) => {
    try {
        const tags = await Book.distinct("tags");
        res.status(200).send({
            success: true,
            data: tags.map((t) => ({ _id: t })),
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Get Single Tag
tagRouter.get("/:tag_id", async (req, res, next) => {
    try {
        const result = await Tag.findById(req.params.tag_id);
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Tag not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Add Single Tag
tagRouter.post("/", async (req, res, next) => {
    //TODO: Add auth
    try {
        const result = await Tag.create({ _id: req.body.name });
        res.status(201).send({
            success: true,
            data: result,
            message: "Tag created successfully",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Add Single Tag To Book
tagRouter.patch("/:book_id", async (req, res, next) => {
    //TODO: Add auth
    try {
        const result = await Book.findByIdAndUpdate(
            req.params.book_id,
            { $push: { tags: req.body.tag._id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Book not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "Book updated with tag successfully",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Delete Single Tag
tagRouter.delete("/:book_id/:tag_id", async (req, res, next) => {
    //TODO: Add auth
    try {
        const result = await Book.findByIdAndUpdate(
            req.params.book_id,
            { $pull: { tags: req.params.tag_id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Book not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "Tag removed from book successfully",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
    /*
  TODO: Below code causing error. Resolve
  Tag.findByIdAndDelete(req.params.tag_id, ...)
  */
});

export default tagRouter;
