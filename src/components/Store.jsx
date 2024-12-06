import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import {db, auth} from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../hooks/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Store.css';

const Store = () => {
  // Setting up the state for the Store component
  const [products, setProducts] = useState([]);// State to keep track of the products
  const [cart, setCart] = useState([]);// State to keep track of the cart
  const navigate = useNavigate();// Navigate to other pages
  const [user] = useAuthState(auth); // Get the current user
  const {role} = useAuth(); // Get the user's role

  useEffect(() => {
    // Update the document title
    updateTitle("Store");

    // Function ro fetch the products from Firestore
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          orderBy('price', 'asc'),
          orderBy('name', 'asc')
        ); // Create a query for the products
        const querySnapshot = await getDocs(q); // Get the products from Firestore
        const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map through the documents and create an array of products
        setProducts(productsArray); // Set the products state
      } catch (error) { // Handle the fetch error
        console.error('Error fetching products:', error);
      }
    };
      fetchProducts();
  }, []);

  // Handle the cart addition for the products

  const  handleAddToCart = (product) =>{
    const updateCart = [...cart, product]; // Copy the cart
    setCart(updateCart); // Add product to cart
    //Toast notification
    toast.success('Product added to cart'); // Show a success toast notification
    

  }
  
  // Render the Store component
  return (
    <div className="store-container">
      <h2>Store</h2>
      <p>Welcome to our gaming store! Check out our exclusive products below.</p>
      {user && role === 'admin' && (
        <button onClick={() => navigate('/AddProduct')} className="add-product-button">
          Add Product
        </button>
      )}
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            {/* <img src={product.image} alt={product.name} /> */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default Store;