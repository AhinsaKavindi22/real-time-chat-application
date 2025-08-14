/**
 * Authentication Middleware Module
 * Provides route protection and user authentication verification
 */

import jwt from "jsonwebtoken";           
import User from "../models/User.js";     

/**
 * Middleware to protect routes from unauthorized access
 * Verifies JWT token and attaches user to request object
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * Expected Header:
 * - token: JWT token received during login/signup
 * 
 * On Success:
 * - Attaches user object to req.user
 * - Calls next() to proceed to route handler
 * 
 * On Failure:
 * - Returns error response if token is invalid or user not found
 */
export const protectRoute = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.token;

        // Verify token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user by ID, exclude password from result
        const user = await User.findById(decoded.userId).select("-password")

        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Attach user object to request for use in route handlers
        req.user = user;

        // Proceed to route handler
        next();

    } catch (error) {
        // Handle token verification errors or database errors
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}