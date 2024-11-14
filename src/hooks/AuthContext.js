import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import your Firebase auth instance

const AuthContext = createContext({role: 'admin'});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role: currentUser ? currentUser.role : null, // Assuming user role is stored in the user object
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};