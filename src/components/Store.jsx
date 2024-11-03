import React, { useState, useEffect } from 'react';
import './Store.css';
import { updateTitle } from '../utils/updateTitle';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have the correct path to your firebase configuration
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    updateTitle("Store");

    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('date', 'desc'), orderBy('price', 'asc'));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(fetchedProducts);
        console.log('Fetched Products:', fetchedProducts); // Debugging statement
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <div className="store-container">
      <h2>Store</h2>
      <p>Welcome to our gaming store! Check out our exclusive products below.</p>
      <button onClick={handleAddProduct} className="add-product-button">
        Add Product
      </button>
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