import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

/**
 * LoginPage Component
 * 
 * A dual-purpose authentication component that handles both user registration and login.
 * Features a two-step registration process:
 * 1. Basic info (name, email, password)
 * 2. Additional info (bio)
 * 
 * The component toggles between login and signup modes, with different form fields
 * displayed based on the current state and submission progress.
 */
const LoginPage = () => {
  // State for tracking whether we're in login or signup mode
  const [currState, setCurrState] = useState("Sign up")
  
  // Form field states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  
  // Tracks progress in the signup flow (false: basic info, true: additional info)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { value } = useContext(AuthContext); 
  const { login } = value; 


  /**
   * Handles form submission for both login and signup flows
   * For signup: Implements a two-step process
   * Step 1: Collect basic information
   * Step 2: Collect additional information (bio)
   * @param {Event} event - The form submission event
   */
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(currState === 'Sign up' && !isDataSubmitted){
      setIsDataSubmitted(true)  // Move to second step of signup
      return;
    }

    login(currState === 'Sign up' ? 'signup' : 'login', {fullName, email, password, bio})
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Left section - Application logo */}
      <img src={assets.logo_big} alt="Chat application logo" className='w-[min(30vw,250px)]' />

      {/* Right section - Authentication form */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        {/* Form header with dynamic title and back button for multi-step signup */}
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {/* Back button - Only shown during second step of signup */}
          {isDataSubmitted && <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="Go back" className='w-5 cursor-pointer' />}

        </h2>
        {currState === "Sign up" && !isDataSubmitted && (
          <input onChange={(e) => setFullName(e.target.value)} value={fullName}
            type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Full Name' required />

        )}
        {!isDataSubmitted && (
          <>
            <input onChange={(e) => setEmail(e.target.value)} value={email}
              type="email" placeholder='Email Address' required className='p-2 
          border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
            <input onChange={(e) => setPassword(e.target.value)} value={password}
              type="password" placeholder='Password' required className='p-2 
          border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
          </>
        )}
        {
          currState === "Sign up" && isDataSubmitted && (
            <textArea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a short bio...' required></textArea>
          )
        }

        {/* Submit button with dynamic text based on current mode */}
        <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        {/* Terms and conditions agreement section */}
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* Mode toggle section - Switch between login and signup */}
        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account? {/* Login link - Resets form state */}
              <span 
                onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} 
                className='font-medium text-violet-500 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account {/* Signup link */}
              <span 
                onClick={() => setCurrState("Sign up")} 
                className='font-medium text-violet-500 cursor-pointer'
              >
                Click here
              </span>
            </p>
          )}
        </div>

      </form>
      <div>

      </div>
    </div>
  )
}

export default LoginPage