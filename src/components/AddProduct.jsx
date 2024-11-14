import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/AuthContext';

const AddProduct = () => {
  const {role} = useAuth(); //gets the user's role
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  // const [image, setImage] = useState('');


  if (role !== 'admin') {
    return <h2>Only admins can add products</h2>;
  }



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