import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Forum from './components/Forum';
import Contact from './pages/Contact';
import Store from './components/Store';
import AddProduct from './components/AddProduct'
import Livestream from './pages/LiveStream';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Login from './pages/Login';
import AddPost from './components/AddPost';
import Video from './pages/Video';
import { Navigate } from 'react-router-dom';
import './App.css';







function App() {

  const [user] = useAuthState(auth);

  const isAdmin = user && user.customClaims && user.customClaims.role === 'admin';


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/livestream" element={<Livestream />} />
        <Route path="/video" element={<Video />} />
        <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={isAdmin ? <AddPost /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
