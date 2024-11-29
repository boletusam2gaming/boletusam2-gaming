import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try { // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password); // Firebase Auth API
      navigate('/');// Redirect to the home page
    } catch (error) { // Handle errors
      console.error('Error logging in: ', error); // Log the error
      alert(error.message);// Show an alert with the error message
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-signin-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;