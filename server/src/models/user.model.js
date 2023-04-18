import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
    //relation till användare för att ha koll på lånade böcker
})

const User = mongoose.model("User", userSchema);
export default User;