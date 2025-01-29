import React, {useEffect, useState} from 'react';
import {db, auth} from '../firebase';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import './Cart.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateTitle } from '../utils/updateTitle';

const Cart = () => {
  // Initialize cart items state
  const [user] = useAuthState(auth); // Get current user
  const [cartItems, setCartItems] = useState([]); // State to keep track of the cart items
  const [savedItems, setSavedItems] = useState([]); // State to keep track of the saved items


  useEffect(() => {
    updateTitle('Cart'); // Update the title of the page 
  // Fetch cart items from Firestore
    const fetchCartItems = async () => {
      if (user){
        const cartCollection = collection(db, 'users', user.uid, 'cart'); // Create a reference to the user's cart collection
        const cartSnapshot = await getDocs(cartCollection); // Get the cart items from Firestore
        const cartItemsArray = cartSnapshot.docs.map(doc => doc.data()); // Map through the documents and create an array of cart items
        setCartItems(cartItemsArray); // Set the cart items state
      }
    };
    
    // fetch savd items from Firestore
    const fetchSavedItems = async () => {
      if (user){
        const savedCollection = collection(db, 'users', user.uid, 'saved'); // Create a reference to the user's saved collection
        const savedSnapshot = await getDocs(savedCollection); // Get the saved items from Firestore
        const savedItemsArray = savedSnapshot.docs.map(doc => doc.data()); // Map through the documents and create an array of saved items
        setSavedItems(savedItemsArray); // Set the saved items state
      }
    };

    //call the fetchCartItems function
    fetchCartItems();
    fetchSavedItems();

  }, [user]);

  // Save for later function
  const saveForLater = async (product) => {
    if (user) {
      const cartCollection = collection(db, 'users', user.uid, 'cart');
      const savedCollection = collection(db, 'users', user.uid, 'saved');
      const cartItemDoc = doc(cartCollection, product.id);
      await deleteDoc(cartItemDoc); // Remove the item from the cart
      await setDoc(doc(savedCollection, product.id), product); // Add the item to the saved collection
      const newCartItems = cartItems.filter(item => item.id !== product.id);
      setCartItems(newCartItems);
      setSavedItems([...savedItems, product]);
    }
  };

  // Remove from cart function
  const removeFromCart = async (product) => {
    if (user) {
      const cartCollection = collection(db, 'users', user.uid, 'cart');
      const cartItemDoc = doc(cartCollection, product.id);
      await deleteDoc(cartItemDoc); // Remove the item from the cart
      const newCartItems = cartItems.filter(item => item.id !== product.id);
      setCartItems(newCartItems);
    }
  };


  // Add to cart function
  const addToCart = async (product) => {
    if (user) {
      const savedCollection = collection(db, 'users', user.uid, 'saved');
      const cartCollection = collection(db, 'users', user.uid, 'cart');
      const savedItemDoc = doc(savedCollection, product.id);
      await deleteDoc(savedItemDoc); // Remove the item from the saved collection
      await setDoc(doc(cartCollection, product.id), product); // Add the item to the cart collection
      const newSavedItems = savedItems.filter(item => item.id !== product.id);
      setSavedItems(newSavedItems);
      setCartItems([...cartItems, product]);
    }
  };

  // calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }


  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="product-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
              <button onClick={() => saveForLater(item)}>Save for Later</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${calculateTotal().toFixed(2)}</p>

      <h2>Saved Items</h2>
      {savedItems.length === 0 ? (
        <p>You have no saved items.</p>
      ) : (
        <ul>
          {savedItems.map((item, index) => (
            <li key={index} className="product-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)}>Move to Cart</button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )  
}

export default Cart;