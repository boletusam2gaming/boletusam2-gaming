import React from 'react';
import './Navbar.css';


export const Navbar = () => {
  return (
        <header className="navbar">
            <div className="logo">
                <a href="/">
                    <img src= "./images/logo_social_modded.png" alt="Boletusam2 Gaming logo" />
                </a>
            </div>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/store">Store</a></li>
                    <li><a href="/livestream">Live Stream</a></li>
                </ul>
            </nav>
        </header>    
        
    );
}
export default Navbar;