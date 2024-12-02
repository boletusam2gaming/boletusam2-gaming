import React, { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const Admin = () => {
  const [uid, setUid] = useState('');
  const [status, setStatus] = useState('');

  const functions = getFunctions();
  const setAdminRole = httpsCallable(functions, 'setAdminRole');

  // Function to set the Admin role for a user
  const handleSetAdmin = () => {
    setAdminRole({ uid })
      .then(result => {
        console.log(result.data.message);// Add state for user UID and status message
        setStatus('Admin role assigned successfully');
      })// Add state for user UID and status message
      .catch(error => {
        console.error('Error assigning role: ', error);
        setStatus('Error assigning admin role');
      });
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <div>
        <label>User UID:</label>
        <input 
          type="text" 
          value={uid} 
          onChange={(e) => setUid(e.target.value)} 
          required 
        />
      </div>
      <button onClick={handleSetAdmin}>Set Admin Role</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Admin;