import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
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
