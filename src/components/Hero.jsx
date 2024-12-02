import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

// Hero component
export const Hero = () => {
  return (
    <section className="hero">

        <div className="overlay"></div>
        <div className="hero-text">
            <h1>Boletusam2 Gaming</h1>
            <p>Coming Soon...</p>
            <button className="stream">
            <Link to="/livestream">Live Stream</Link>
            </button>
        </div>  
    </section>
  );
}
export default Hero;