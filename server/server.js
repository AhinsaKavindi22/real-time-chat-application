/**
 * Main Server Configuration File
 */

import express from "express";        // Web application framework
import "dotenv/config";              // Load environment variables
import cors from "cors";             // Enable Cross-Origin Resource Sharing
import http from "http";             // Node.js built-in HTTP module
import { connectDB } from "./lib/db.js";          // Database connection
import userRouter from "./routes/userRoutes.js";   // User-related routes
import messageRouter from "./routes/messageRoute.js"; // Message-related routes
import { Server } from "socket.io";   // WebSocket server implementation

/**
 * Server Initialization
 * Creates Express app and HTTP server
 * Sets up Socket.io for real-time communication
 */
const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
export const io = new Server(server, {
    cors: {
        origin: "*"  // Allow connections from any origin
    }
});

/**
 * Real-time User Tracking
 * Maps user IDs to their socket connections
 * Format: { userId: socketId }
 */
export const userSocketMap = {};

/**
 * Socket.io Event Handlers
 * Manages real-time connections and events
 */
io.on("connection", (socket) => {
    // Extract user ID from connection query
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);

    // Register user's socket connection
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Broadcast online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

/**
 * Middleware Configuration
 * Sets up global middleware for all routes
 */
app.use(express.json({
    limit: "4mb"  // Allow larger payloads for image uploads
}));

app.use(cors());  // Enable CORS for all routes

/**
 * API Routes Configuration
 * Sets up main route handlers for different parts of the application
 */

// Health check endpoint
app.use("/api/status", (req, res) => res.send("Server is live"));

// User authentication routes (/api/auth/*)
app.use("/api/auth", userRouter);

// Message handling routes (/api/messages/*)
app.use("/api/messages", messageRouter);

/**
 * Database Connection
 * Establish connection to MongoDB before starting the server
 */
await connectDB();

/**
 * Server Startup
 * Initialize the server on the specified port
 * Uses PORT from environment variables or defaults to 5000
 */
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log("Server is running on PORT: " + PORT));
}


// export server for vercel
export default server;
