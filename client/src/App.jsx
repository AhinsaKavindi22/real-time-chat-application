import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from 'react-hot-toast'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'

/**
 * App Component
 * Root component of the application that handles main routing and layout structure
 * 
 * Features:
 * - Routing configuration for different pages
 * - Global toast notifications system
 * 
 * The Toaster component is placed here to provide application-wide notifications
 * for events like:
 * - Authentication success/failure
 * - Message send/receive status
 * - Profile updates
 * - Connection status
 * - Error messages
 * 
 * Usage example in other components:
 * import toast from 'react-hot-toast';
 * 
 * toast.success('Profile updated!');
 * toast.error('Failed to send message');
 * toast.loading('Sending...');
 */
const App = () => {

  const { value } = useContext(AuthContext); 
  const { authUser } = value; 
  

  return (
    // Container div with background image using Tailwind CSS
    <div className="bg-[url('/bgImage.svg')] bg-contain">
      <Toaster/>
      {/* Router configuration for the application */}
      <Routes>
        <Route path= '/' element= {authUser ? <HomePage/> : <Navigate to= '/login'/>}/>
        <Route path= '/login' element= {!authUser ? <LoginPage/> : <Navigate to= '/'/>}/>
        <Route path= '/profile' element= {authUser ? <ProfilePage/> : <Navigate to= '/login'/>}/>
      </Routes>
    </div>
  )
}

export default App