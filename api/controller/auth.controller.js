import { errorHandler } from "../errors/error.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bc from "bcrypt"
dotenv.config();

export const signUp = async  (req, res, next ) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password : hashPassword });
    try {
        await newUser.save();
        res.status(201).json({
            message : 'User created successfully'
        });    
    } catch (error) {
        next(errorHandler(300, error.message));
    }
}

export const signIn = async  ( req, res, next) => {
    const { email, password } = req.body;
    // res.json({
    //     email,
    //     password
    // });
    try {
        const validateUser = await  User.findOne({ email });
        if(!validateUser){
            return next(errorHandler(401, "User not found"));
        }
        const validatePassword = bcrypt.compareSync(password, validateUser.password);
        if(!validatePassword){
            return next(errorHandler(401, 'wrong credentials'));
        }
        const token = jwt.sign({ id : validateUser._id }, process.env.SECRET);
        const { password : hashedPassword, ...rest  } = validateUser._doc;
        const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, {
            httpOnly : true,
            expires : tokenExpiry
        })
        .status(200)
        .json(rest);
    } catch (error) {
        next(error);
    }

}