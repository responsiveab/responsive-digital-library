import express from "express";
import User from "../models/user.model.js";
import auth from "../middleware/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userRouter = express.Router();

//TODO: Ta bort detta, använder det för testning  nu.
userRouter.get("/", async (req, res, next) => {
    try {
        const result = await User.find({});
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

// Get Single User

//Get user by id
userRouter.get("/:user_id", auth, async (req, res, next) => {
    try {
        const result = await User.findById(req.params.user_id);
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "User successfully fetched",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Add single book to user reading list
userRouter.patch("/:user_id", auth, async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.params.user_id,
            { $push: { reading_list_books: req.body.book._id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "Book successfully added to reading list",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

//Delete a single book from user reading list
userRouter.patch(
    "/:user_id/reading-list-books/:book_id",
    auth,
    async (req, res, next) => {
        try {
            const result = await User.findByIdAndUpdate(
                req.params.user_id,
                { $pull: { reading_list_books: req.params.book_id } },
                { new: true }
            );
            if (!result) {
                return res.status(404).send({
                    success: false,
                    error: "User not found",
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Book successfully removed from reading list",
            });
        } catch (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
    }
);

// Add single book to user loan list
userRouter.patch("/:user_id/loan-list-books", auth, async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(
            req.params.user_id,
            { $push: { loan_list_books: req.body.book._id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).send({
                success: false,
                error: "User not found",
            });
        }
        res.status(200).send({
            success: true,
            data: result,
            message: "Book successfully added to loan list",
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});

// Delete a single book from user loan list
userRouter.patch(
    "/:user_id/loan-list-books/:book_id",
    auth,
    async (req, res, next) => {
        try {
            const result = await User.findByIdAndUpdate(
                req.params.user_id,
                { $pull: { loan_list_books: req.params.book_id } },
                { new: true }
            );
            if (!result) {
                return res.status(404).send({
                    success: false,
                    error: "User not found",
                });
            }
            res.status(200).send({
                success: true,
                data: result,
                message: "Book successfully removed from loan list",
            });
        } catch (err) {
            res.status(400).send({
                success: false,
                error: err.message,
            });
        }
    }
);


userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Login unsuccessful" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.encrypted_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Login unsuccessful" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY
        );

        res.status(200).json({
            message: "Login successful",
            user,
            token,
        });

    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const encrypted_password = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, encrypted_password });

        // Generate JWT token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY
        );

        // Save user to database
        await user.save();

        res.status(201).json({ message: "Register successful", token: token });

    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

userRouter.delete("/delete", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOneAndDelete({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default userRouter;
