import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext';


/**
 * HomePage Component
 * 
 * Main layout component that serves as the container for the chat application.
 * Manages the selected user state and renders the three main sections:
 * - Sidebar (user list and navigation)
 * - ChatContainer (main chat interface)
 * - RightSidebar (additional user information and settings)
 * 
 * The layout is responsive and adjusts based on screen size and whether a user is selected:
 * - Mobile: Single column layout
 * - Tablet/Desktop (no selection): Two column layout
 * - Tablet/Desktop (with selection): Three column layout with adjusted proportions
 */
const HomePage = () => {
  const { value1 } = useContext(ChatContext);
  const { selectedUser } = value1;

  return (
    // Main container with responsive padding
    <div className="border w-full h-screen sm:px-[10%] sm:py-[3%]">
      {/* Inner container with glass effect and responsive grid layout */}
      <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden
      h-[100%] grid grid-cols-1 relative ${
        // Dynamic grid layout based on selection state and screen size
        selectedUser
          ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' // Three column layout when user selected
          : 'md:grid-cols-2' // Two column layout when no user selected
        }`}>
        {/* Left sidebar with user list */}
        <Sidebar />
        {/* Main chat container */}
        <ChatContainer />
        {/* Right sidebar with user details */}
        <RightSidebar />
      </div>
    </div>
  )
}

export default HomePage