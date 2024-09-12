import { errorHandler } from "../errors/error.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import bc from "bcrypt"
dotenv.config();

export const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(errorHandler(false, 300, 'User already exists'));
        }

        // Hash the password asynchronously
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashPassword });
        await newUser.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        // Handle any errors
        return next(errorHandler(false, 500, error.message));
    }
};

export const signIn = async  ( req, res, next) => {
    const { email, password } = req.body;
    // res.json({
    //     email,
    //     password
    // });
    try {
        const validateUser = await  User.findOne({ email });
        if(!validateUser){
            return next(errorHandler(false ,401, "User not found"));
        }
        const validatePassword = bcrypt.compareSync(password, validateUser.password);
        if(!validatePassword){
            return next(errorHandler(false ,401, 'wrong credentials'));
        }
        const token = jwt.sign({ id : validateUser._id }, process.env.SECRET);
        const { password : hashedPassword, ...rest  } = validateUser._doc;
        const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour
        res.cookie('access_token', token, {
            httpOnly : true,
            expires : tokenExpiry
        })
        .status(200)
        .json({
            data : rest,
            'success' : true,
            'message' : 'User Login successFully'
        });
    } catch (error) {
        next(error);
    }

}