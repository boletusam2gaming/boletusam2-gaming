import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateTitle } from '../utils/updateTitle';
import {db, auth} from '../firebase';
import { collection, getDocs, orderBy, query, setDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAuth } from '../hooks/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Store.css';
import SidePanel from './SidePanel';


// Import the image
import bgLngSlvShrt from '../assets/merch/bg_lng_slv_shrt.jpg';



const Store = () => {
  // Setting up the state for the Store component
  const [products, setProducts] = useState([]);// State to keep track of the products
  const [cart, setCart] = useState([]);// State to keep track of the cart
  const navigate = useNavigate();// Navigate to other pages
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);// State to keep track of the side panel
  const [user] = useAuthState(auth); // Get the current user
  const {role} = useAuth(); // Get the user's role

  useEffect(() => {
    // Update the document title
    updateTitle("Store");

    // Function to fetch the products from Firestore
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
      const fetchCartItems = async () => {
        if (user){
          const cartCollection = collection(db, 'users', user.uid, 'cart'); // Create a reference to the user's cart collection
          const cartSnapshot = await getDocs(cartCollection); // Get the cart items from Firestore
          const cartItemsArray = cartSnapshot.docs.map(doc => doc.data()); // Map through the documents and create an array of cart items
          setCart(cartItemsArray); // Set the cart items state
        };
      };




      fetchProducts();
      fetchCartItems();
  }, [user]);

  // Handle the cart addition for the products

  const  handleAddToCart = async (product) =>{
    const updateCart = [...cart, product]; // Copy the cart
    console.log('Adding to cart:', product);
    setCart(updateCart); // Add product to cart

    // Add the product to the cart collection in Firestore
    if (user) {
      try {
        const cartCollection = collection(db, 'users', user.uid, 'cart');
        const cartItemDoc = doc(cartCollection, product.id); // Create a reference to the cart item document
        await setDoc(cartItemDoc, product); // Set the cart item document
        // console.log('Product added to Firestore:', product); // Debugging statement
        toast.success('Product added to cart'); // Show a success toast notification
      } catch (error) {
        // console.error('Error adding product to cart:', error); // Handle the error
        toast.error('Failed to add product to cart'); // Show an error toast notification
      }
    } else {
      // console.error('User is not authenticated'); // Handle the case where the user is not authenticated
      toast.error('You need to be logged in to add products to the cart'); // Show an error toast notification
    }
  }


    // Side panel for cart functions
  const handleOpenSidePanel = () => {
    setIsSidePanelOpen(true);
  };

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
  };


  
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
            <img src={product.image || bgLngSlvShrt} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
        
      </div>
      <button className="open-side-panel-button" onClick={handleOpenSidePanel}> View Cart </button>
      <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} cartItems={cart} /> {/* Side panel for the cart */}
     
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default Store;