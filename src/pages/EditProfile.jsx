import React, { useState } from 'react';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import './EditProfile.css';

const EditProfile = () => {
  const auth = getAuth(); // Get the auth service
  const user = auth.currentUser; // Get the current user
  const [name, setName] = useState(user.displayName || ''); // Set the name state to the user's display name
  const [email, setEmail] = useState(user.email || ''); // Set the email state to the user's email
  const [password, setPassword] = useState(''); // Add state for password

    // Function to handle updating the user profile
  const handleUpdateProfile = async (e) => {
    // Prevent the default form submission
    e.preventDefault();
    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error('Error:', error.code, error.message);
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