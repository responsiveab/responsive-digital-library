import express from 'express';
import User from '../models/user.model';
const userRouter = express.Router();

//TODO: Ta bort detta, använder det för testning  nu.
userRouter.get("/", (req, res, next) => {
    User.find({}, function(err,result){
        if(err){
            res.status(400).send({
                'success' : false,
                'error': err.message
            });
        }
        res.status(200).send({
            'success': true,
            'data' : result
        });
    });
});

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
userRouter.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email:email}, async (err, user) => {
        if(user) {
           if(await bcrypt.compare(password, user.encrypted_password)) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY
                );
               res.send({message: "login successful", user:user, token:token})
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
    User.findOne({email:email}, async (err, user) => {
        if(user) {
            res.send({message: "user already exist"})
        } else {
            const encrypted_password = await bcrypt.hash(password, 10);
            const user = new User({name, email, encrypted_password});

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY
            );

            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({message: "register successful", token:token})
                }
            })
        }
    })
});

export default userRouter;