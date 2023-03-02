import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   slug: {
       type: String
   }
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
