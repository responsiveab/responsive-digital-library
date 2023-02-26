import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
   _id: String,
   title: {
       type: String,
       required: true
   },
   body: {
       type: String
   },
   author: {
       type: String
   },
   shelf: {
       type: String
   },
   category: {
       type: String
   },
   language: {
       type: String
   },
   publisher: {
       type: String
   },
   published: {
    type: String
   },
   imgstr: {
    type: String
   },
   borrowed: Boolean,
   digital: Boolean,
   tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
   ]
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
