import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const uploadOnCloudinary = async (file) => {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    const filepath = file.path;
    try {
        if (!filepath) {
            return null
        }

        const uploadResult = await cloudinary.uploader.upload(filepath);
        // Delete only if file exists
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        return uploadResult.secure_url

    } catch (error) {
        // Safe delete in case of error
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        console.log(error);
    }
}

