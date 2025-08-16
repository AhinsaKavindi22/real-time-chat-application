/**
 * @file This file is responsible for creating a React Context for authentication.
 * This context will be used to provide and consume authentication-related data
 * and functions throughout the entire application, avoiding the need to pass props
 * down through multiple levels of components (prop drilling).
 */

import { createContext } from "react";

/**
 * Creates and exports the authentication context.
 * Components can use this context to access shared authentication state
 * such as the authenticated user, login/logout functions, and more.
 * The actual data is provided by the AuthProvider component.
 */
export const AuthContext = createContext();