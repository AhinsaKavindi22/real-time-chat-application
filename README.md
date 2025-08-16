# Real-Time Chat Application

A full-stack, real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrated with Socket.IO for instant messaging. This project provides a seamless and interactive chatting experience with features like user authentication, online user status, and personal profile management.

## ✨ Features

-   **User Authentication**: Secure user registration and login system using JSON Web Tokens (JWT).
-   **Real-Time Messaging**: Instant two-way communication between users powered by Socket.IO.
-   **Online User Status**: See which users are currently online in real-time.
-   **Personalized Profiles**: Users can update their full name, bio, and profile picture.
-   **Responsive Design**: A clean and modern user interface built with Tailwind CSS that works on both desktop and mobile devices.
-   **Persistent Sessions**: User login state is persisted, so they remain logged in across browser sessions.
-   **Cloud-Based Image Uploads**: Profile pictures are uploaded to Cloudinary, ensuring fast and reliable image delivery.
-   **Toast Notifications**: User-friendly notifications for actions like login, logout, and profile updates.

## 🛠️ Tech Stack

**Frontend:**
-   **React.js**: A JavaScript library for building user interfaces.
-   **Vite**: A fast and modern frontend build tool.
-   **Socket.IO Client**: For handling real-time communication.
-   **React Router DOM**: For client-side routing.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Axios**: For making HTTP requests to the backend API.
-   **React Hot Toast**: For user-friendly notifications.

**Backend:**
-   **Node.js**: A JavaScript runtime environment.
-   **Express.js**: A web application framework for Node.js.
-   **MongoDB**: A NoSQL database for storing user and message data.
-   **Mongoose**: An Object Data Modeling (ODM) library for MongoDB.
-   **Socket.IO**: For enabling real-time, bidirectional communication.
-   **JSON Web Token (JWT)**: For secure user authentication.
-   **Cloudinary**: For cloud-based image storage and management.
-   **bcrypt.js**: For hashing user passwords.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v14 or newer)
-   MongoDB (local installation or a cloud service like MongoDB Atlas)
-   A Cloudinary account (for image uploads)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AhinsaKavindi22/real-time-chat-application.git
    cd real-time-chat-application
    ```

2.  **Set up the Backend:**
    -   Navigate to the backend directory:
        ```bash
        cd server
        ```
    -   Install the dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `backend` directory and add the following environment variables with your own credentials:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key

        # Cloudinary Credentials
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```
    -   Start the backend server:
        ```bash
        npm run server
        ```
    The backend will be running on `http://localhost:5000`.

3.  **Set up the Frontend:**
    -   Open a new terminal and navigate to the frontend directory:
        ```bash
        cd client
        ```
    -   Install the dependencies:
        ```bash
        npm install
        ```
    -   Create a `.env` file in the `frontend` directory and add the backend URL:
        ```env
        VITE_BACKEND_URL=http://localhost:5000
        ```
    -   Start the frontend development server:
        ```bash
        npm run dev
        ```
    The application will be available at `http://localhost:5173`.

### Available Scripts

#### Backend (`/backend`):
-   `npm start`: Starts the server using `node server.js`.
-   `npm run dev`: Starts the server with `nodemon` for automatic restarts during development.

#### Frontend (`/frontend`):
-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the application for production.
-   `npm run preview`: Serves the production build locally.

---

