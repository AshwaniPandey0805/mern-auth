import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async  (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password : hashPassword });
    try {
        await newUser.save();
        res.status(201).json({
            message : 'User created successfully'
        });    
    } catch (error) {
        res.status(500).json(error.message);
    }
    
    console.log(req.body);
}