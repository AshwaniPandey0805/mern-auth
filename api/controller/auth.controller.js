import { errorHandler } from "../errors/error.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

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