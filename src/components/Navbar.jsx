import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


export const Navbar = () => {

    // YouTube Video
    const videoSrc = "https://www.youtube.com/embed/39yS9P43nUU?autoplay=1&loop=1&mute=1&playlist=39yS9P43nUU"; // Modified embed link

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