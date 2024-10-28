import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


export const Navbar = () => {
  return (
        <header className="navbar">
            <div className="logo">
                <Link to="/">
                <img src={`${process.env.PUBLIC_URL}/images/logo_social_modded.png`} alt="Boletusam2 Gaming logo" />
                </Link>
            </div>
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/store">Store</Link></li>
                <li><Link to="/livestream">Live Stream</Link></li>

                </ul>
            </nav>
        </header>    
        
    );
}
export default Navbar;