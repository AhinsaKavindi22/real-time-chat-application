import Message from "../models/Message.js";        
import User from "../models/User.js";             
import cloudinary from "../lib/cloudinary.js";     // Cloudinary for image uploads
import { io, userSocketMap } from "../server.js";  // Socket.io instance and user socket mapping

/**
 * Get all users for the sidebar except the currently logged-in user
 * Also includes count of unseen messages from each user
 * @param {Object} req - Express request object with authenticated user
 * @param {Object} res - Express response object
 */
export const getUsersForSidebar = async (req,res) => {
    try {
        // Get current user's ID from the authenticated request
        const userId = req.user._id;
        
        // Find all users except current user, exclude password field
        const filteredUsers = await User.find({_id: {$ne:userId}}).select("-password");

        // Create object to store unseen message counts for each user
        const unseenMessages = {}
        
        // Create array of promises to check unseen messages from each user
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen:false})
            if(messages.length > 0){
                unseenMessages[user._id] = messages.length;
            }
        })

        // Wait for all unseen message counts to be collected
        await Promise.all(promises);
        
        // Send response with users and their unseen message counts
        res.json({ success: true, users: filteredUsers, unseenMessages })
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })    
    }
}

/**
 * Retrieve all messages between current user and selected user
 * Also marks messages from selected user as seen
 * @param {Object} req - Express request object with user ID in params
 * @param {Object} res - Express response object
 */
export const getMessages = async (req,res) => {
    try {
        // Get the selected user's ID from request parameters
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        // Find all messages between current user and selected user
        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId: selectedUserId},      // Messages I sent
                {senderId:selectedUserId, receiverId: myId}       // Messages I received
            ]
        });

        // Mark all messages from selected user as seen
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

        // Return the messages
        res.json({ success: true, messages })
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })    
    }

}

// API to mark message as seen using message id
export const markMessageAsSeen = async (req,res) => {
    try {
        const {id} = req.params;

        await Message.findByIdAndUpdate(id, {seen: true});
        res.json({ success: true })
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })    
    }

}


/**
 * Send a new message to a selected user
 * Supports both text and image messages
 * Uses Socket.io for real-time message delivery
 * @param {Object} req - Express request object with message content and receiver ID
 * @param {Object} res - Express response object
 */
export const sendMessage = async (req,res) => {
    try {
        // Extract message content and receiver ID
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;

        let imageUrl;

        // If message includes an image, upload it to Cloudinary
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // Create new message in database
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        // Real-time notification using Socket.io
        // Get receiver's socket ID and emit message if they're online
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Send success response with the new message
        res.json({ success: true, newMessage });
        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })    
    }
}