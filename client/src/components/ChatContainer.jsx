/**
 * ChatContainer Component
 * Renders the main chat interface including messages, input area, and user info
 */

import React, { useContext, useEffect, useRef, useState } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessgeTime } from '../lib/utils'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const ChatContainer = () => {

  const { value1 } = useContext(ChatContext);
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = value1;

  const { value } = useContext(AuthContext);
  const { authUser, onlineUsers } = value;

  const [input, setInput] = useState("");

  // Reference for auto-scrolling to the latest message
  const scrollEnd = useRef()

  // handle sending a messgae
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("")
  }

  // handle sending a image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith("image/")) {
      toast.error("select and image file")
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser])




  // Auto-scroll to the latest message when component mounts
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])



  // Render chat interface if a user is selected, otherwise show welcome screen
  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* Header Section: Shows selected user info and controls */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        {/* User profile picture */}
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className='w-8 rounded-full' />
        {/* User name and online status */}
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {/* Online status indicator */}
          {onlineUsers.includes(selectedUser._id) &&
            <span className='w-2 h-2 rounded-full bg-green-500'></span>}

        </p>
        {/* Mobile-only navigation controls */}
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md-hidden max-w-7' />
        <img src={assets.help_icon} alt="" className='md-hidden max-w-5' />
      </div>

      {/* Chat Messages Area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {/* Map through messages and render each one */}
        {messages.map((msg, index) => (
          <div key={index}
            className={`flex items-end gap-2 justify-end ${msg.senderId !== authUser._id && 'flex-row-reverse'}`}>
            {/* Render either image or text message */}
            {msg.image ? (
              <img src={msg.image}
                alt=""
                className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
            ) : (
              <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all 
                            bg-violet-500/30 text-white 
                            ${msg.senderId === authUser._id ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                {msg.text}
              </p>
            )}
            {/* Message metadata: user avatar and timestamp */}
            <div className='text-center text-xs'>
              <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.profile_martin}
                alt=""
                className='w-7 rounded-full' />
              <p className='text-gray-500'>{formatMessgeTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        {/* Auto-scroll anchor point */}
        <div ref={scrollEnd}></div>
      </div>
      {/* Message Input Area */}
      <div className='absolute bottom-0 left-0 right-0 flex item-center gap-3 p-3'>
        {/* Input container with message input and image upload */}
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          {/* Text message input */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
            type="text"
            placeholder='Send a Message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
          />
          {/* Hidden file input for image upload */}
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept='image/png, image/jpeg'
            hidden
          />
          {/* Image upload button */}
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt="Upload image"
              className='w-5 mr-2 cursor-pointer'
            />
          </label>
        </div>
        {/* Send message button */}
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send message"
          className='w-7 cursor-pointer'
        />
      </div>
    </div>
  ) : (
    // Welcome Screen - Shown when no chat is selected
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="App logo" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer

