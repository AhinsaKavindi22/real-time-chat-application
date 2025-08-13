import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

/**
 * App Component
 * Root component of the application that handles main routing and layout structure
 */
const App = () => {
  return (
    // Container div with background image using Tailwind CSS
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      
      {/* Router configuration for the application */}
      <Routes>
        <Route path= '/' element= {<HomePage/>}/>
        <Route path= '/login' element= {<LoginPage/>}/>
        <Route path= '/profile' element= {<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App