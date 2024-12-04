import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import {db} from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Store.css';

const Store = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {
    // Update the document title
    updateTitle("Store");

    // Function ro fetch the products from Firestore
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
      fetchProducts();
  }, []);

  
  // Render the Store component
  return (
    <div className="store-container">
      <h2>Store</h2>
      <p>Welcome to our gaming store! Check out our exclusive products below.</p>
      {currentUser && currentUser.role === 'admin' && (
        <button onClick={() => navigate('/AddProduct')} className="add-product-button">
          Add Product
        </button>
      )}
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;