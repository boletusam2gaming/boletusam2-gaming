import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      toast.success('User created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('User logged in successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
        {isSignUp && (
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              name="auth-username" // Unique name attribute
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder='Enter your username'
              required={isSignUp} 
            />
          </div>
        )}
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="auth-email" // Unique name attribute
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter your email'
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            name="auth-password" // Unique name attribute
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter your password'
            required 
          />
        </div>
        <button type="submit" className='signup'>{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        <img src="/images/google_logo.png" alt="Google Logo" style={{ width: '90px', marginRight: '15px' }} />
        {isSignUp ? 'Sign Up with Google' : 'Login with Google'}
      </button>
      <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default Auth;