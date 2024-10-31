import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'posts'));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postsArray = [];
      for (const doc of querySnapshot.docs) {
        const postData = { id: doc.id, ...doc.data() };
        const commentsSnapshot = await getDocs(collection(db, `posts/${doc.id}/comments`));
        postData.comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() }));
        postsArray.push(postData);
      }
      setPosts(postsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content };
    await addDoc(collection(db, 'posts'), newPost);
    setTitle('');
    setContent('');
  };

  const handleCommentChange = (postId, value) => {
    setComments({
      ...comments,
      [postId]: value,
    });
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    const newComment = { content: comments[postId] };
    const commentRef = await addDoc(collection(db, `posts/${postId}/comments`), newComment);
    setComments({
      ...comments,
      [postId]: '',
    });
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: commentRef.id, ...newComment }]
        };
      }
      return post;
    }));
  };

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleDeleteComment = async (postId, commentId) => {
    await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  return (
    <div className="container">
      <h1>Public Forum. 
      <br/>Please feel free to post your thoughts and comments on any games.


      </h1>
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
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button className="delete" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
              <div>
                <h4>Comments</h4>
                <ul>
                  {post.comments && post.comments.map((comment) => (
                    <li key={comment.id}>
                      {comment.content}
                      <button className="delete" onClick={() => handleDeleteComment(post.id, comment.id)}>Delete Comment</button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)}>
                  <input 
                    type="text" 
                    value={comments[post.id] || ''} 
                    onChange={(e) => handleCommentChange(post.id, e.target.value)} 
                    placeholder="Add a comment" 
                    required 
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;