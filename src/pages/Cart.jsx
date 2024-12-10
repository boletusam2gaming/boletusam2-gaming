import React, {useEffect, useState} from 'react';
import {db, auth} from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Cart.css';
import { useAuthState } from 'react-firebase-hooks/auth';

const Cart = () => {
  // Initialize cart items state
  const [user] = useAuthState(auth); // Get current user
  const [cartItems, setCartItems] = useState([]); // State to keep track of the cart items

  useEffect(() => {

      



  // Fetch cart items from Firestore
    const fetchCartItems = async () => {
      if (user){
        const cartCollection = collection(db, 'users', user.uid, 'cart'); // Create a reference to the user's cart collection
        const cartSnapshot = await getDocs(cartCollection); // Get the cart items from Firestore
        const cartItemsArray = cartSnapshot.docs.map(doc => doc.data()); // Map through the documents and create an array of cart items
        setCartItems(cartItemsArray); // Set the cart items state
      }
    };

    //call the fetchCartItems function
    fetchCartItems();

  }, [user]);

  // add to cart function
  const addToCart = async (product) => {
    if (user) {
      const cartCollection = collection(db, 'users', user.uid, 'cart');
      const docRef = await addDoc(cartCollection, product);
      setCartItems([...cartItems, {...product, id: docRef.id}]);
    }
  };
  

  // Remove from cart function
  const removeFromCart =  async (product) => {
    if (user) {
      const cartCollection = collection (db, 'users', user.uid, 'cart');
      const cartItenDoc = doc(cartCollection, product.id);
      await deleteDoc(cartItenDoc);
      const newCartItems = cartItems.filter(item => item.id !== product.id);
      setCartItems(newCartItems);
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
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}{' '}
              <button onClick={() => addToCart(item)}>Add to cart</button>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${calculateTotal().toFixed(2)}</p>
    </div>
  )  
}

export default Cart