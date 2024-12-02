import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const AddProduct = () => {
  const [user] = useAuthState(auth);
  const { role, setRole } = useAuth(); // gets the user's role and setRole function
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  // const [image, setImage] = useState('');

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        setRole(idTokenResult.claims.role);
      });
    }
  }, [user, setRole]);

  // Check if the user is authenticated and an admin
  if (!user) {
    return <h2>Please log in to add products</h2>;
  }

  if (role !== 'admin') {
    navigate('/'); // Redirect to the home page or any other page
    return null;
  }

  // Handle Submut for porduct addition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        description,
        date: new Date(date),
      });
      setName('');
      setPrice('');
      setDescription('');
      setDate('');
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };





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