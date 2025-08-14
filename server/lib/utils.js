/**
 * Utility Module for Authentication
 * Provides functions for JWT (JSON Web Token) operations
 */

// Import the JWT library for token generation and verification
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for user authentication
 * @param {string} userId - The user's ID from the database
 * @returns {string} JWT token that can be used for authentication
 * 
 * Note: Requires JWT_SECRET to be set in environment variables
 * The token includes:
 * - userId: to identify the user
 * - iat (issued at): automatically added by JWT
 */
export const generateToken = (userId) => {
    // Create a new JWT token with the userId payload
    const token = jwt.sign(
        { userId },               // Payload containing user ID
        process.env.JWT_SECRET   // Secret key for signing
    );
    return token;
} 