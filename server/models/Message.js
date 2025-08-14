/**
 * Message Model Module
 * Defines the schema and model for chat messages in the application
 */

// Import mongoose for schema definition
import mongoose from "mongoose";

/**
 * Message Schema
 * Defines the structure of chat messages in the database
 * 
 * Fields:
 * - senderId: ID of the user sending the message
 * - receiverId: ID of the user receiving the message
 * - text: The message content (optional if image is provided)
 * - image: URL of an uploaded image (optional)
 * - seen: Whether the message has been seen by the receiver
 * 
 * Includes timestamps for createdAt and updatedAt
 */
const messageSchema = new mongoose.Schema({
    // Reference to the sender's User document
    senderId: {
        type: mongoose.Schema.Types.ObjectId,  // MongoDB ObjectId type
        ref: "User",                          // References the User model
        required: true                        // Must be provided
    },
    
    // Reference to the receiver's User document
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    // Message text content (optional)
    text: {
        type: String
    },
    
    // URL to uploaded image (optional)
    image: {
        type: String
    },
    
    // Message read status
    seen: {
        type: Boolean,
        default: false    // Messages start as unseen
    },

}, {
    timestamps: true     // Automatically add createdAt and updatedAt fields
});

/**
 * Message Model
 * Compiled model from the message schema
 * Used for all message-related database operations
 */
const Message = mongoose.model("Message", messageSchema);

// Export the Message model for use in other parts of the application
export default Message;