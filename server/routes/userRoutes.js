import express from 'express'
import { 
    checkAuth,       // Verify authentication status
    login,          // Handle user login
    signup,         // Handle new user registration
    updateProfile   // Handle profile updates
} from '../controllers/userController.js';
import { protectRoute } from '../middleware/auth.js';  
// Create Express router instance
const userRouter = express.Router();

/**
 * User Routes Configuration
 * Base path: /api/users
 * 
 * Public routes:
 * - signup
 * - login
 * 
 * Protected routes (require authentication):
 * - update-profile
 * - check-auth
 */

// Register a new user account
// Body: { fullName, email, password, bio }
userRouter.post("/signup", signup);

// Authenticate user and get token
// Body: { email, password }
userRouter.post("/login", login);

// Update user profile information (requires authentication)
// Body: { fullName, bio, profilePic (optional) }
userRouter.put("/update-profile", protectRoute, updateProfile);

// Verify if user's token is valid (requires authentication)
// Headers: { token }
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;