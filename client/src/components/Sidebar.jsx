/**
 * Sidebar Component
 * Displays the user list, search functionality, and navigation menu
 * Handles user selection and profile navigation
 */

import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

    const { value1 } = useContext(ChatContext);
    const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = value1;

    const { value } = useContext(AuthContext);
    const { logout, onlineUsers } = value;

    // Hook for programmatic navigation
    const navigate = useNavigate();

    const [input, setInput] = useState(false);

    const filteredUsers = input ? users.filter(
        (user) => user.fullName.toLowerCase().includes(input.toLowerCase())
    ) : users;

    useEffect(() => {
        getUsers();
    }, [onlineUsers])

    return (
        // Main sidebar container with responsive behavior
        <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white 
            ${selectedUser ? "max-md-hidden" : ''}`}>

            {/* Header Section */}
            <div className='pb-5'>
                {/* Logo and Menu Container */}
                <div className='flex justify-between items-center'>
                    {/* App Logo */}
                    <img src={assets.logo} alt="logo" className='max-w-40' />

                    {/* Dropdown Menu */}
                    <div className='relative py-2 group'>
                        {/* Menu Icon */}
                        <img src={assets.menu_icon} alt="Menu" className='max-h-5 cursor-pointer' />

                        {/* Dropdown Content - Shows on hover */}
                        <div className='absolute top-fill right-0 z-20 w-32 p-5 rounded-md
                            bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                            {/* Profile Navigation Option */}
                            <p onClick={() => navigate('/profile')}
                                className='cursor-pointer text-sm'>
                                Edit Profile
                            </p>
                            <hr className='my-2 border-t border-gray-500' />
                            {/* Logout Option */}
                            <p onClick={() => logout()} className='cursor-pointer text-sm'>Logout</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
                    <img src={assets.search_icon} alt="Search" className='w-3' />
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        className='bg-transparent border-none outline-none text-white
                            text-xs placeholder-[#c8c8c8] flex-1'
                        placeholder='Search User...'
                    />
                </div>
            </div>
            {/* User List Section */}
            <div className='flex flex-col'>
                {/* Map through users and render each user item */}
                {filteredUsers.map((user, index) => (
                    <div
                        onClick={() => { setSelectedUser(user); setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
                        key={index}
                        className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer 
                            max-sm:text-sm ${selectedUser?.id === user._id && 'bg-[#282142]/50'}`}
                    >
                        {/* User Avatar */}
                        <img
                            src={user?.profilePic || assets.avatar_icon}
                            alt={`${user.fullName}'s avatar`}
                            className='w-[35px] aspect-[1/1] rounded-full'
                        />

                        {/* User Info */}
                        <div className='flex flex-col leading-5'>
                            {/* User Name */}
                            <p>{user.fullName}</p>

                            {/* Online Status - First 3 users shown as online for demo */}
                            {onlineUsers.includes(user._id) ? (
                                <span className='text-green-400 text-xs'>Online</span>
                            ) : (
                                <span className='text-neutral-400 text-xs'>Offline</span>
                            )}
                        </div>

                        {/* Unread Message Count Badge - Show for users after index 2 */}
                        {unseenMessages[user._id] > 0 && (
                            <p className='absolute top-4 right-4 text-xs h-5 w-5
                                flex justify-center items-center rounded-full 
                                bg-violet-500/50'
                            >
                                {unseenMessages[user._id]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar