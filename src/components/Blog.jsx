// src/components/Blog.jsx
import React, { useState, useEffect } from 'react';
import './Blog.css';
import { updateTitle } from '../utils/updateTitle';


const Blog = () => {

  useEffect(() => {
    updateTitle("Blog")
  });

  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/articles.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);
  

  const filteredArticles = filter === 'All' ? articles : articles.filter(article => article.category === filter);

  return (
    <div className="blog-container">
      <h2>News & Reviews</h2>
      <div className="filter-container">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="News">News</option>
          <option value="Reviews">Reviews</option>
        </select>
      </div>
      <div className="articles">
        {filteredArticles.map(article => (
          <div key={article.id} className="article">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
