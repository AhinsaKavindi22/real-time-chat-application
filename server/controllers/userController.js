import { generateToken } from "../lib/utils.js";    
import User from "../models/User.js";               
import bcrypt from 'bcryptjs'                      // Password hashing library
import cloudinary from '../lib/cloudinary.js'       // Cloud storage for profile pictures

/**
 * Register a new user in the system
 * @param {Object} req - Express request object containing user details
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data and JWT token
 */
export const signup = async (req, res) => {
    // Extract user details from request body
    const { fullName, email, password, bio } = req.body;

    try {
        // Validate that all required fields are provided
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // Check if user already exists with this email
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account already exists" })
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in database
        const newUser = await User.create({
            fullName, 
            email, 
            password: hashedPassword, 
            bio
        });

        // Generate JWT token for authentication
        const token = generateToken(newUser.id);

        // Return success response with user data and token
        res.json({ 
            success: true, 
            userData: newUser, 
            token, 
            message: "Account created successfully" 
        })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

/**
 * Authenticate user and generate JWT token
 * @param {Object} req - Express request object with email and password
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data and JWT token
 */
export const login = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;
        
        // Find user by email
        const userData = await User.findOne({ email });

        // Verify password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Credintials" })
        }

        // Generate new JWT token
        const token = generateToken(userData.id);
        
        // Return success response with user data and token
        res.json({ 
            success: true, 
            userData, 
            token, 
            message: "Login successfull" 
        })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

/**
 * Verify if user is authenticated
 * Used as a middleware check point
 * @param {Object} req - Express request object with user data from auth middleware
 * @param {Object} res - Express response object
 */
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user });
}

/**
 * Update user profile information
 * Handles both profile picture upload and basic info updates
 * @param {Object} req - Express request object with profile update data
 * @param {Object} res - Express response object
 */
export const updateProfile = async (req, res) => {
    try {
        // Extract update data from request body
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updatedUser;

        if (!profilePic) {
            // Update only bio and fullName if no new profile picture
            updatedUser = await User.findByIdAndUpdate(
                userId, 
                { bio, fullName }, 
                { new: true }  // Return updated document
            )
        } else {
            // Upload new profile picture to Cloudinary
            const upload = await cloudinary.uploader.upload(profilePic);
            
            // Update all user information including new profile picture URL
            updatedUser = await User.findByIdAndUpdate(
                userId, 
                { 
                    profilePic: upload.secure_url, 
                    bio, 
                    fullName 
                }, 
                { new: true }
            );
        }

        // Return success response with updated user data
        res.json({ success: true, user: updatedUser })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

