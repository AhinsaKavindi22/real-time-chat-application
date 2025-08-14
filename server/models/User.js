/**
 * User Model Module
 * Defines the schema and model for users in the chat application
 * Handles user account information and profile details
 */

// Import mongoose for schema definition
import mongoose from "mongoose";

/**
 * User Schema
 * Defines the structure of user documents in the database
 * 
 * Fields:
 * - email: Unique identifier for user authentication
 * - fullName: User's display name
 * - password: Hashed password (min 6 characters)
 * - profilePic: URL to user's profile picture
 * - bio: User's personal description
 * 
 * Includes timestamps for createdAt and updatedAt
 */
const userSchema = new mongoose.Schema({
    // User's email address (unique identifier)
    email: {
        type: String,
        required: true,     // Email is mandatory
        unique: true       // No duplicate emails allowed
    },
    
    // User's full name for display
    fullName: {
        type: String,
        required: true     // Name is mandatory
    },
    
    // User's password (stored as hash)
    password: {
        type: String,
        required: true,    // Password is mandatory
        minlength: 6      // Minimum password length
    },
    
    // URL to user's profile picture
    profilePic: {
        type: String,
        default: ""       // Default to empty string if no picture
    },
    
    // User's bio/description
    bio: {
        type: String      // Optional field
    },

}, {
    timestamps: true      // Automatically manage createdAt and updatedAt
});

/**
 * User Model
 * Compiled model from the user schema
 * Used for all user-related database operations
 * Referenced by Message model for sender and receiver
 */
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;