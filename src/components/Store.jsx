import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import './Store.css';

const Store = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {

    updateTitle("Store");

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.forthwall.com/v1/products', {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_FORTHWALL_STOREFRONT_API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  });


  const handleAddProduct = () => {
    navigate('/add-product');
  };

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