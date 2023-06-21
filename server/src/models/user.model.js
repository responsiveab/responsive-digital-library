import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    //TODO: _id: String, //equivalent name
    name: String, //TODO: Remove
    email: String,
    encrypted_password: String,

    //relation till användare för att ha koll på lånade böcker
    reading_list_books: [
        {
            type: String,
            ref: "Book",
        },
    ],
    loan_list_books: [
        {
            type: String,
            ref: "Book",
        },
    ],
});

const User = mongoose.model("User", userSchema);
export default User;
