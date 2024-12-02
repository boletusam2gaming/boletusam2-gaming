import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import './Blog.css'; // CSS file for styling

const Blog = () => {
  const [filter, setFilter] = useState('All');
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    updateTitle("Blog");
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'Blog'), orderBy('Date', 'desc'), orderBy('Title', 'asc'));
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

  // Check user authentication state if user is an admin or not
  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult.claims.admin) {
          console.log('User is an admin');
        } else {
          console.log('User is not an admin');
        }
      });
    }
  }, [user]);


  // Filter articles based on the selected category
  const filteredArticles = filter === 'All' ? articles : articles.filter(article => article.category === filter);
  
  // Filter articles based on the selected category
  const handleAddPost = () => {
    navigate('/AddPost');
  };

  return (
    <div className="blog-container">
      <h1>Blog</h1>
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
      {user && user.customClaims && user.customClaims.role === 'admin' && (
        <button onClick={handleAddPost} className="add-post-button">
          Add Post
        </button>
      )}
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