import mongoose from "mongoose";
import dotenv, { config } from 'dotenv';
dotenv.config();

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("database connected...")
    } catch (error) {
        console.error(error.message)
        console.log("connection failed...");
    }
}