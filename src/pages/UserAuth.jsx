import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './UserAuth.css';

const UserAuth = () => {
  const [email, setEmail] = useState('');// Add state for email
  const [password, setPassword] = useState(''); // Add state for password
  const [name, setName] = useState(''); // Add state for name 
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign up and sign in
  const auth = getAuth();
  const navigate = useNavigate();

  // Function to handle sign up and sign in  
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name }); // Update user profile with name
        toast.success('Signed up successfully!');
        console.log('Signed up:', userCredential.user);
      } else {
        // Sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success('User logged in successfully');
        console.log('Signed in:', userCredential.user);
      }
      navigate('/'); // Redirect to home page after login/signup
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error('Error:', error.code, error.message);
    }
  };

  // Function to handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      toast.error('Please enter your email to reset password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error('Error:', error.code, error.message);
    }
  };
  // Return the user authentication form
  return (
    <div className="user-auth-container">
      <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      <form onSubmit={handleAuth}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
      {!isSignUp && (
        <button onClick={handlePasswordReset} className="reset-password-button">
          Forgot Password?
        </button>
      )}
    </div>
  );
};

export default UserAuth;