// src/context/AuthContext.js
import { createContext, useState, useContext } from 'react';

// Create context with default value
const AuthContext = createContext(null);

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using this context
export const useAuth = () => {
  return useContext(AuthContext);
};