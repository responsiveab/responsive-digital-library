import express from "express";
import Book from "../models/book.model.js";
import auth from "../middleware/auth.js";


const bookRouter = express.Router();

// Get all Books
bookRouter.get("/", async (req, res, next) => {
    try {
        // TODO: Add auth if needed
        const books = await Book.find({});

        return res.status(200).send({
            success: true,
            data: books,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
// bookRouter.get('/list', (req,res,next) => {
//   Book.find({_id: {$in:idList}}, function(err,result){
//     if(err){
//       res.status(400).send({
//         sucess:false,
//         error:err.message
//       });
//     }
//     res.status(200).send({
//       success: true,
//       data: result
//     });
//   });
// });

bookRouter.get("/list", async (req, res, next) => {
    const idList = req.query.ids.split(",");
    if (!idList || idList.length === 0) {
        return res.status(400).send({
            success: false,
            error: "No book IDs specified",
        });
    }
    try {
        const result = await Book.find({ _id: { $in: idList } });
    
        if (!result || result.length === 0) {
            return res.status(404).send({
                success: false,
                error: "No books found with the specified IDs",
            });
        }
    
        console.log(result);
        return res.status(200).send({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            error: err.message,
        });
    }
});

// Get Single Book
bookRouter.get("/:book_id", async (req, res, next) => {
    //TODO: Add auth
    try {
        const result = await Book.findById({_id : req.params.book_id}).exec();
    
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Book not found",
            });
        }
    
        return res.status(200).send({
            success: true,
            data: result,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Add Single Book
bookRouter.post("/", auth, async (req, res, next) => {
    const newBook = {
        _id: req.body.id,
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        author: req.body.author,
        shelf: "H1", // COMMENT: Hardcoded for now, since this
        // behaviour isnt implemented yet
        category: req.body.category,
        language: req.body.language,
        publisher: req.body.publisher,
        published: req.body.date,
        imgstr: req.body.img,
        borrower: "i biblioteket",
        borrowed: false, // COMMENT: Hardcoded for now, since this
        digital: false, // behaviour isnt implemented yet
    };
    try {
        const result = await Book.create(newBook);
        res.status(201).send({
            success: true,
            data: result,
            message: "Book created successfully",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Edit Single Book
bookRouter.patch("/:book_id", auth, async (req, res, next) => {
    try {
        const fieldsToUpdate = req.body;
        const result = await Book.findByIdAndUpdate(
            req.params.book_id,
            { $set: fieldsToUpdate },
            { new: true }
        );

        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Book not found",
            });
        }

        return res.status(200).send({
            success: true,
            data: result,
            message: "Book updated successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Delete Single Book
bookRouter.delete("/:book_id", auth, async (req, res, next) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.book_id);

        if (!result) {
            return res.status(404).send({
                success: false,
                error: "Book not found",
            });
        }

        return res.status(200).send({
            success: true,
            data: result,
            message: "Book deleted successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

export default bookRouter;
