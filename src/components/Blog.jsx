import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useAuth} from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import './Blog.css'; // CSS file for styling

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth); // Get the current user
  const {role} = useAuth(); // Get the user's role
  const navigate = useNavigate();

  useEffect(() => {
    updateTitle("Blog");
  }, []);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'blog'), orderBy('Date', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched posts:', fetchedPosts); // Debugging purposes
        setArticles(fetchedPosts); // Initialize articles with fetched posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  // Filter articles based on the selected category
  const filteredArticles = filter === 'All' ? articles : articles.filter(article => article.category === filter);
  
  // Filter articles based on the selected category
  const handleAddPost = () => {
    navigate('/AddPost');
  };


  return (
    <div className="blog-container">
      <h1>Blog</h1>
      {user && role === 'admin' && (
        <button onClick={handleAddPost} className="add-post-button">
          Add Post
        </button>
      )} 
      
      <div className="filter-container">
        <label htmlFor="category-filter">Filter by category:</label>
        <select
          id="category-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          {/* Add more categories as needed */}
        </select>
      </div>
       
      <ul className="post-list">
        {filteredArticles.map(post => (
          <li key={post.id} className="post-item">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>Author: {post.author}</p>
            <p>Date: {new Date(post.date.seconds * 1000).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;