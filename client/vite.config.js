// this file is used to configure Vite for the React application

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// Vite configuration for the React application
// https://vite.dev/config/
export default defineConfig({
  // plugins are used to extend Vite's functionality
  // here we are using the React plugin for JSX support
  // and Tailwind CSS plugin for styling
  plugins: [react(), tailwindcss()],
  
})

