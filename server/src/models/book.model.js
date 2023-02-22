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
   }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
