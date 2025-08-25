import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

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
    <div className="relative">
      {/* Background image with blur */}
      <div className="absolute inset-0 bg-[url('/bgImage.jpg')] bg-cover bg-center blur-sm"></div>

      {/* Content overlay */}
      <div className="relative z-10">
        <Toaster />
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </div>
  )
}

export default App