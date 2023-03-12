import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
   _id: String
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
