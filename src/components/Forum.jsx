// Imports for the Forum component
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, 
  getDocs, orderBy, startAfter, limit } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Forum.css';


// Forum component for the public forum for discussions
const Forum = () => {
  // Setting up the state for the forum component
  const [posts, setPosts] = useState([]); // State to keep track of the posts
  const [title, setTitle] = useState(''); // State to keep track of the post title
  const [content, setContent] = useState(''); // State to keep track of the post content
  const [comments, setComments] = useState({}); // State to keep track of the comments
  const [user, setUser] = useState(null); // State to keep track of the current user
  const [isAdmin, setIsAdmin] = useState(false); // State to keep track of the user's Admin status
  const [loading, setLoading] = useState(false);  // State to keep track of loading state
  const [lastVisible, setLastVisible] = useState(null); // State to keep track of the last visible post


  // Checking if the user is Admin
  useEffect(() => { // Use an effect hook to check if the user is Admin
    const checkAdmin = async (currentUser) => { // Function to check if the user is Admin
      if (currentUser) { // Check if the user is logged in
        const token = await currentUser.getIdTokenResult(); // Get the user's token
        setIsAdmin(token.claims.admin || false); // Set the user as Admin if they are logged in and have the admin claim
      } else { 
        setIsAdmin(false); // Set the user as not Admin if they are not logged in
      }
    };
    // Check if the user is Admin
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // Check if the user is logged in
      setUser(currentUser); // Set the current user
      checkAdmin(currentUser); // Check if the user is Admin
    }); 

    return () => unsubscribe();
  }, []);  

  // Fetching posts from Firestore
  useEffect(() => { // Use an effect hook to fetch the posts from Firestore
    if (user) { // Check if the user is logged in
      const fetchPosts = async () => {
        setLoading(true); // Set loading state to true
        const q = query(collection(db, 'posts'), orderBy('date', 'desc')); // Create a query for the posts
        const unsubscribe = onSnapshot(q, async (querySnapshot) => { // Get the posts from Firestore
          const postsArray = []; // Create an array to store the posts
          for (const doc of querySnapshot.docs) { // Loop through the posts
            const postData = { id: doc.id, ...doc.data() }; // Get the post data
            const commentsSnapshot = await getDocs(collection(db, `posts/${doc.id}/comments`)); // Get the comments for the post
            postData.comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() })); // Get the comments for the post
            postsArray.push(postData); // Add the post to the posts array
          }
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Set the last visible post for pagination
          setPosts(postsArray); // Update the state with the fetched posts
          setLoading(false); // Set loading state to false
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
      };
      fetchPosts(); // Fetch the posts
    };
    
  
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // function to load more posts 
  const loadMorePosts = async ()  => {
    if (lastVisible){ // Check if there are more posts to load
      setLoading(true); // Set loading state to true
      const q = query(collection(db, 'posts'), orderBy('date', 'desc'), startAfter(lastVisible), limit(13)); // Create a query for the posts
      const querySnapshot = await getDocs(q);   // Get the posts from Firestore
      const postsArray = []; // Create an array to store the posts
      for (const doc of querySnapshot.docs) { // Loop through the posts
        const postData = {id : doc.id, ...doc.data()}; // Get the post data
        const commentsSnapshot = await getDocs(collection(db, `posts/${doc.id}/comments`)); // Get the comments for the post
        postData.comments = commentsSnapshot.docs.map(commentDoc => ({ id: commentDoc.id, ...commentDoc.data() })); // Get the comments for the post
        postsArray.push(postData); // Add the post to the posts array
      }
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Set the last visible post for pagination
      setPosts(prevPosts => [...prevPosts, ...postsArray]); // Update the state with the fetched posts
      setLoading(false); // Set loading state to false
    }
  };



  // Adding a new post to Firestore
  const handleSubmit = async (e) => {  // Function to handle form submission
    e.preventDefault(); // Prevent the default form submission
    const newPost = { title, content, date: new Date() }; // Create a new post object
    await addDoc(collection(db, 'posts'), newPost); // Add the new post to Firestore
    setTitle(''); // Reset the title input
    setContent(''); // Reset the content input
  };
  
  // Handling comment changes
  const handleCommentChange = (postId, value) => { // Function to handle comment changes
    setComments({ 
      ...comments,
      [postId]: value, // Update the comment with the new value
    }); 
  };
// Adding a new comment to forum
  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault(); // Prevent the default form submission
    const newComment = { content: comments[postId] }; // Create a new comment object
    const commentRef = await addDoc(collection(db, `posts/${postId}/comments`), newComment); // Add the comment to the post
    setComments({
      ...comments, 
      [postId]: '', 
    });

    // Updating the state with the new comment
    setPosts(posts.map(post => { // Update the state with the new comment
      if (post.id === postId) { // Find the post that the comment belongs to
        return { // Return the post with the new comment added
          ...post,
          comments: [...post.comments, { id: commentRef.id, ...newComment }] // Add the new comment to the post
        };
      }
      return post;  
    }));
  };

  // Deleting a post from the forums
  const handleDeletePost = async (postId) => {
    try{
      await deleteDoc(doc(db, 'posts', postId)); // Delete the post
      console.log(`Post ${postId} deleted successfully`); // Log the success message
    }catch(error){ // Catch any errors
      console.error("Error removing document: ", error); // Log the error
    }
  };

  // delete comment from the forum
  const handleDeleteComment = async (postId, commentId) => { // Function to delete a comment
    try {
      await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));   // Delete the comment
      setPosts(posts.map(post => { // Update the state to remove the comment
        if (post.id === postId) { // Find the post that the comment belongs to
          return { // Return the post with the comment removed 
            ...post, 
            comments: post.comments.filter(comment => comment.id !== commentId) // Filter out the comment that was deleted
          }; 
        }
        return post; 
      })); 
      console.log(`Comment ${commentId} deleted successfully`); // Log the success message
    } catch (error) { // Catch any errors
      console.error('Error deleting comment:', error); // Log the error
    }
  };

  // Return the forum component
  return (
    <div className="container">
    <h1>Public Forum</h1>
    {isAdmin && (
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
        <button type="submit">Post</button>
      </form>
    )}
    <div className='forum-posts'>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {isAdmin && (
              <button className="delete" onClick={() => handleDeletePost(post.id)}>Delete Post</button>
            )}
            <div className="comments">
              <ul>
                {post.comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.content}
                    {isAdmin && (
                      <button className="delete" onClick={() => handleDeleteComment(post.id, comment.id)}>Delete Comment</button>
                    )}
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