import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import './Store.css';

const Store = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {
    // Update the document title
    updateTitle("Store");
    // Fetch products from the ForthWall API
    const fetchProducts = async () => {
      try { // Fetch products from the ForthWall API
        const response = await fetch('https://api.forthwall.com/v1/products', {
          headers: {// Include the API key in the Authorization header
            'Authorization': `Bearer ${process.env.REACT_APP_FORTHWALL_STOREFRONT_API_KEY}`
          }
        });
        if (!response.ok) {// Handle the response error
          throw new Error('Network response was not ok');
        }
        const data = await response.json();// Parse the JSON response
        setProducts(data.products);// Set the products state
      } catch (error) {// Handle the fetch error
        console.error('Error fetching products:', error);
      }
    };
    // Call the fetchProducts function
    fetchProducts();
  });

  // Handle the Add Product button click
  const handleAddProduct = () => {
    navigate('/add-product');
  };

  // Render the Store component
  return (
    <div className="store-container">
      <h2>Store</h2>
      <p>Welcome to our gaming store! Check out our exclusive products below.</p>
      {currentUser && currentUser.role === 'admin' && (
        <button onClick={handleAddProduct} className="add-product-button">
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