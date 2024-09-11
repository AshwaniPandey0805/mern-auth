import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;
console.log(process.env.MONGODB);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB).then(() => {
    console.log('connected to mongoDB');
}).catch((error) => {
    console.log(error);
});

// CORS middleware should be placed before the routes
app.use(cors({
    origin: 'http://localhost:5173' // Specify the frontend origin here
}));

app.use(express.json());

// Routes
app.use('/api/user', userRouter);
app.use('/auth/user', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const message = err.message || 'Internal server error';
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
