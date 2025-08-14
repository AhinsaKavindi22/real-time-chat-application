// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * Uses MONGODB_URI from environment variables
 * Appends /chat-app to create/connect to specific database
 */
export const connectDB = async () => {
    try {
        // Set up event listener for successful connection
        mongoose.connection.on('connected', () => console.log('Database Connected'));

        // Attempt to connect to MongoDB
        // process.env.MONGODB_URI should be in format: mongodb://username:password@host:port
        // or mongodb+srv://username:password@cluster.mongodb.net
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        // Log any connection errors
        console.log(error);
    }
}