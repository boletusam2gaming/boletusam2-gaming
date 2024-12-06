import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import './AddProduct.css';

const AddProduct = () => {
  const [user] = useAuthState(auth);
  const {role, setRole } = useAuth(); // gets the user's role and setRole function
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // const [image, setImage] = useState('');

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        // console.log('User token:', idTokenResult); // Debugging statement
        // console.log('User role:', idTokenResult.claims.role); // Debugging statement
        setRole(idTokenResult.claims.role || ''); // Set role or empty string if undefined
        setLoading(false); // Set loading to false after setting the role
      }).catch(error => {
        console.error('Error getting token result:', error); // Log any errors
        setLoading(false); // Set loading to false in case of error
      });
    } else {
      setLoading(false); // Set loading to false if no user is found
    }
  }, [user, setRole]);


  useEffect(() => {
    // Check if the user is authenticated and an admin
    if (!loading && role !== null) {
      // console.log('User:', user); // this is for debugging
      // console.log('Role:', role); //  this is for debugging
      if (!user) {
        navigate('/login'); // Redirect to the login page if the user is not authenticated
      } else if (role !== 'admin') {
        navigate('/addproduct'); // Redirect to the home page if the user is not an admin
      }
    }
  }, [user, role, navigate, loading]);



  // Handle Submit for porduct addition
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {// Add the product to Firestore
      await addDoc(collection(db, 'products'), {// Add the product to Firestore
        name,
        price: parseFloat(price),
        description,
        date: new Date(date),
        createdBy: user.uid,
      });
      // Clear the form fields
      setName('');
      setPrice('');
      setDescription('');
      setDate('');
      // setImage('');  Clear the image field
      // Show an alert
      alert('Product added successfully'); 
      navigate('/Store'); // Redirect to the store
    } catch (error) {// Log the error to the console
      console.error('Error adding product: ', error);
    }
  };




  // Render the AddProduct component
  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Price:</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
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
        {/*
         <div>
          <label>Image:</label>
          <input 
            type="file" 
            onChange={(e) => setImage(e.target.files[0])} 
            required 
          />
        */}
        <button type="submit">Add Product</button>
      </form>
    </div>
    
  );
};

export default AddProduct;