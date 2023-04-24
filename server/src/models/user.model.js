import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    encrypted_password: String,

    //relation till användare för att ha koll på lånade böcker 
    reading_list_books: [
        {
            type: String,
            ref: "Book"
        }
   ]

})

  

});


const User = mongoose.model("User", userSchema);
export default User;