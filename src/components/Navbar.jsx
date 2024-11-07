import React from 'react';
import { Link } from 'react-router-dom';
import codVideo from '../assets/mw3_quad_killstreak.mp4';
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
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/store">Store</Link></li>
                <li><Link to="/forum">Forums</Link></li>
                <li><Link to="/livestream">Live Stream</Link></li>
            </ul>
            <div className="background-video-container">
                <video src={codVideo} loop muted autoPlay className="background-video"></video>
            </div>
        </nav>
        
    </header>
);
}
export default Navbar;