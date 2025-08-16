import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider.jsx";
import { ChatProvider } from "../context/ChatProvider.jsx";

// Render the main application component wrapped in BrowserRouter for routing
// browserRouter enables the use of React Router for navigation
// createRoot is used to render the React application into the root element
// The root element is typically defined in the HTML file (index.html)
// This setup allows for a single-page application experience with client-side routing
{/*
  All components in the application have access to:
  
Authentication state
User information
Real-time communication features
Pre-configured axios instance for API calls
  */ }
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);

