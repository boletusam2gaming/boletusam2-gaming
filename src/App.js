import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Forum from './components/Forum';
import Contact from './pages/Contact';
import Store from './components/Store';
import AddProduct from './components/AddProduct';
import Livestream from './pages/LiveStream';
import Admin from './components/Admin';
import Footer from './components/Footer';
import UserAuth from './pages/UserAuth';
import AddPost from './components/AddPost';
import Video from './pages/Video';
import EditProfile from './pages/EditProfile';
import Cart from './pages/Cart.jsx';
import { AuthProvider } from './hooks/AuthContext'; // Ensure you have the correct path to your AuthContext
import './App.css';
import { ToastContainer } from 'react-toastify';






// This is the main component that will be rendered by the index.js file
function App() {

  // This is a custom hook that will return the user object if the user is logged in
  const [user] = useAuthState(auth);
  // This is a boolean that will be true if the user is logged in and is an admin
  const isAdmin = user && user.customClaims && user.customClaims.role === 'admin';

// The Router component is used to define the routes in the application
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/store" element={<Store />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/livestream" element={<Livestream />} />
          <Route path="/video" element={<Video />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/login" element={<UserAuth />} />
          <Route path="/addpost" element={isAdmin ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/edit-profile" element={ <EditProfile />} /> 
        </Routes>
        <Footer />
        <ToastContainer/>
      </Router>
    </AuthProvider>
  );
}

export default App;
