import express from 'express';
import User from '../models/user.model';
const userRouter = express.Router();

userRouter.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email:email}, (err, user) => {
        if(user) {
           if(password === user.password) {
               res.send({message: "login successful", user:user})
           } else {
               res.send({message: "login unsuccessful"})
           }
        } else {
            res.send("not registered")
        }
    })
});

userRouter.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    User.findOne({email:email}, (err, user) => {
        if(user) {
            res.send({message: "user already exist"})
        } else {
            const user = new User({name, email, password})
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "register successful"})
                }
            })
        }
    })
});

export default userRouter;