import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';


// Create a context
const AuthContext = createContext();
// Create a hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

//  Create a provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null); // state to store the user's role
  const [loading, setLoading] = useState(true);
  
  // Check if the user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setRole(token.claims.role); // Set the user's role from the token claims
        setCurrentUser(user);
      } else {
        setRole(null);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  
  // Logout function
  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };

  // Value to be passed to the context
  const value = {
    currentUser,
    role,
    setRole,
    logout,
  };


  // Render the children only if the user is not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};