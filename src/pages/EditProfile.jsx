import React, { useState } from 'react';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import './EditProfile.css';

const EditProfile = () => {
  const auth = getAuth(); // Get the auth service
  const user = auth.currentUser; // Get the current user
  const [name, setName] = useState(user.displayName || ''); // Set the name state to the user's display name
  const [email, setEmail] = useState(user.email || ''); // Set the email state to the user's email

    // Function to handle updating the user profile
  const handleUpdateProfile = async (e) => { // Function to handle updating the user profile
    // Prevent the default form submission
    e.preventDefault();
    try { // Try to update the user profile
      if (name !== user.displayName) {// Check if the name has changed
        await updateProfile(user, { displayName: name });// Update the user's display name
      }// Check if the email has changed
      if (email !== user.email) {// Check if the email has changed
        await updateEmail(user, email);// Update the user's email
      }
      toast.success('Profile updated successfully!');// Display a success message
    } catch (error) {// Catch any errors
      toast.error(`Error: ${error.message}`); // Display an error message
      console.error('Error:', error.code, error.message);// Log the error
    }
  };
  // Return the edit profile form
  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;