import express from "express";
import axios from "axios";
import Book from "../models/book.model.js";
import auth from "../middleware/auth.js";


const bookRouter = express.Router();

// Inline SVG placeholder, kept in sync with client/src/media/cover_missing_img.js
// and migrate-covers.sh.
const COVER_MISSING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="192" viewBox="0 0 128 192"><rect width="128" height="192" fill="gainsboro" stroke="lightgray"/><text x="64" y="92" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">Ingen</text><text x="64" y="108" text-anchor="middle" fill="gray" font-family="sans-serif" font-size="11">omslagsbild</text></svg>`;
const COVER_MISSING_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(COVER_MISSING_SVG)}`;

// Normalize imgstr so each book document is self-contained: fetch http(s) URLs
// and replace them with data URLs, fall back to the SVG placeholder for
// missing or unreachable images.
async function normalizeImgstr(imgstr) {
    if (!imgstr || typeof imgstr !== "string") return COVER_MISSING_IMG;
    if (imgstr.startsWith("data:")) return imgstr;
    if (!/^https?:\/\//i.test(imgstr)) return COVER_MISSING_IMG;
    try {
        const res = await axios.get(imgstr, {
            responseType: "arraybuffer",
            timeout: 10000,
            maxContentLength: 5 * 1024 * 1024,
            maxBodyLength: 5 * 1024 * 1024,
        });
        const contentType = res.headers["content-type"] || "image/jpeg";
        const base64 = Buffer.from(res.data).toString("base64");
        return `data:${contentType};base64,${base64}`;
    } catch (err) {
        console.warn(`normalizeImgstr: failed to fetch ${imgstr}: ${err.message}`);
        return COVER_MISSING_IMG;
    }
}

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
        imgstr: await normalizeImgstr(req.body.img),
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
        if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, "imgstr")) {
            fieldsToUpdate.imgstr = await normalizeImgstr(fieldsToUpdate.imgstr);
        }
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
