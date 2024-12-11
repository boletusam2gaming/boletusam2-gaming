import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import './AddPost.css';

const AddPost = () => {
  const [user] = useAuthState(auth);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

    // Code given by GitHub CoPilot to add a new post to forum collection in Firebase starts here
  // Redirect to login page if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add a new post to forum collection in Firebase
    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        author,
        category,
        date: new Date(date),
        createdBy: user.uid,
      });
      setTitle('');
      setContent('');
      setAuthor('');
      setCategory('');
      setDate('');
      alert('Post added successfully');
    } catch (error) {
      console.error('Error adding post: ', error);
    }
  };

    // Code given by GitHub CoPilot to add a new post to forum collection in Firebase ends here
  return (
    <div className="add-post-container">
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Author:</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Category:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;