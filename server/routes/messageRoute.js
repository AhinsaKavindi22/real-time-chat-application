import express from 'express'
import { protectRoute } from '../middleware/auth.js';  // Authentication middleware
import { 
    getMessages,          // Get conversation messages
    getUsersForSidebar,   // Get user list for chat sidebar
    markMessageAsSeen,    // Mark message as read
    sendMessage          // Send new message
} from '../controllers/messageController.js';

// Create Express router instance
const messageRouter = express.Router();

/**
 * Message Routes Configuration
 * All routes are protected with authentication middleware
 * Base path: /api/messages
 */

// Returns list of users for the sidebar with unread message counts
messageRouter.get("/users", protectRoute, getUsersForSidebar);

// Returns all messages between current user and user with :id
messageRouter.get("/:id", protectRoute, getMessages);

// Marks specific message as seen using message :id
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);

// Sends a new message to user with :id
messageRouter.post("/send/:id", protectRoute, sendMessage);

// Export the router for use in main application
export default messageRouter;