/**
 * Cloudinary Configuration Module
 * This module sets up the Cloudinary service for image uploads in the chat application
 * Cloudinary is used for storing profile pictures and chat message images
 */

// Import Cloudinary v2 SDK and rename it to 'cloudinary' for easier use
import {v2 as cloudinary} from "cloudinary";

/**
 * Configure Cloudinary with credentials from environment variables
 * Required environment variables:
 * - CLOUDINARY_CLOUD_NAME: Your Cloudinary cloud name
 * - CLOUDINARY_API_KEY: Your Cloudinary API key
 * - CLOUDINARY_API_SECRET: Your Cloudinary API secret
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,        
    api_secret: process.env.CLOUDINARY_API_SECRET, 
})

// Export configured Cloudinary instance for use in other modules
export default cloudinary;

