import React, { createContext, useState, useContext, useEffect } from 'react';
import {appwriteService} from '../services/appwriteService'; // Adjust the import path as necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing authenticated user when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await appwriteService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login method (example using Appwrite service)
  const login = async (email, password) => {
    try {
      const userData = await appwriteService.login(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout method (example using Appwrite service)
  const logout = async () => {
    try {
      await appwriteService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
