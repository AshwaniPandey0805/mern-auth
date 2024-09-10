import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = 3000;
console.log(process.env.MONGODB);
mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('connected to mongoDB')
}).catch((error) => {
    console.log(error)
});

app.listen(port, ()=>{
    console.log(`Server is running on prot ${port} number`);
});