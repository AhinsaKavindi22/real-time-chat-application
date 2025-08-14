import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

/**
 * ProfilePage Component
 * 
 * A page component that allows users to update their profile information including:
 * - Profile picture
 * - Display name
 * - Bio/status message
 * 
 * The component features a responsive layout with a form and logo display,
 * and handles image preview functionality for profile picture updates.
 */
const ProfilePage = () => {
  // State for managing the selected profile image file
  const [seletedImg, setSelectedImg] = useState(null);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // User profile information states with default values
  const [name, setName] = useState("Martin Johnson")
  const [bio, setBio] = useState("Hi Everyone, I am Using QuickChat")

  /**
   * Handles form submission for profile updates
   * Currently navigates to home page after submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/')  // Redirect to home page after save
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      {/* Profile card container with glass effect and responsive layout */}
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        {/* Profile update form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile Details</h3>
          
          {/* Profile image upload section */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden 
            />
            {/* Image preview - shows selected image or default avatar */}
            <img 
              src={seletedImg ? URL.createObjectURL(seletedImg) : assets.avatar_icon} 
              alt="Profile avatar" 
              className={`w-12 h-12 ${seletedImg && 'rounded-full'}`} 
            />
            Upload Profile Image
          </label>

          {/* Display name input field */}
          <input 
            onChange={(e) => setName(e.target.value)} 
            value={name}
            type="text" 
            required 
            placeholder='Your Name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 fcus:ring-violet-500' 
          />

          {/* Bio/status message input field */}
          <textarea 
            onChange={(e) => setBio(e.target.value)} 
            value={bio}
            placeholder='Write profile bio' 
            required 
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 fcus:ring-violet-500'
          ></textarea>

          {/* Submit button with gradient background */}
          <button 
            type='submit' 
            className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'
          >
            Save
          </button>
        </form>

        {/* App logo display - repositions to top on mobile */}
        <img 
          src={assets.logo_icon} 
          alt="App logo" 
          className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' 
        />
      </div>
    </div>
  )
}

export default ProfilePage