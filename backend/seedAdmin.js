import mongoose from "mongoose";
import argon2 from "argon2";
import { User } from "./models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL});
        if (existingAdmin) {
            console.log("Admin already exists with this email id");
            return;
        }

        const hashedPassword = await argon2.hash(process.env.ADMIN_PASSWORD);
        const admin = new User({
            name: "Super Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        await admin.save();
        console.log("Admin created successfully")

    } catch (error) {
         console.error("Error creating admin:", error);
    } finally {
        mongoose.disconnect();
    }
};

createAdmin();