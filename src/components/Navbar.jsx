import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import {ShoppingCart} from "phosphor-react";
import './Navbar.css';

// Navbar component
export const Navbar = () => {

    const {currentUser, logout} = useAuth(); //get current user for role check from AuthContext
    const navigate = useNavigate(); //useNavigate hook for navigation

    // console.log('Current User:', currentUser);  Debugging statement

    // Logout function
    const handleLogout = async () => {
        try {
          await logout();
          navigate('/login');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    // YouTube Video
    const videoSrc = "https://www.youtube.com/embed/39yS9P43nUU?autoplay=1&loop=1&mute=1&controls=0&playlist=39yS9P43nUU"; // Modified embed link


      // Return the Navbar component
    return (
        <header className="navbar">
            
            <div className="logo">
                <Link to="/">
                    <img src={`${process.env.PUBLIC_URL}/images/logo_social_modded.png`} alt="Boletusam2 Gaming logo" />
                </Link>
            </div>
            
            {/* navbar links */}
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li className="dropdown" id="about"> 
                        <span>General</span>
                        <ul className="dropdown-content">
                           <li><Link to="/about">About</Link></li>
                           <li><Link to="/blog">Blog</Link></li> 
                           <li><Link to= "/Games">Games</Link></li>
                           <li><Link to ="/Events">Events</Link></li>
                        </ul>
                    
                    </li>                    
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/store">Store</Link></li>
                    <li><Link to="/forum">Forums</Link></li>
                    <li><Link to="/video"> Videos</Link></li>
                    <li><Link to="/livestream">Live Stream</Link></li>
                    <li className="cart"><Link to="/cart"><ShoppingCart size={32}/> </Link></li>
                    {currentUser ? (
                        <>
                        <li className="dropdown">
                            <span>Welcome, {currentUser.displayName}</span>
                            <ul className="dropdown-content">
                            <li><Link to="/edit-profile">Edit Profile</Link></li>
                            <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        </li>
                        </>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                    
                </ul>
                
            </nav>
            {/* YouTube Video */}
            <div className="background-video-container">
                <iframe 
                src={videoSrc} 
                title="YouTube video player" 
                allow="accelerometer;
                    autoplay; 
                    clipboard-write;
                    encrypted-media;
                    gyroscope; 
                    web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                className="background-video"
                ></iframe>
            </div>
        </header>
    );
}
export default Navbar;