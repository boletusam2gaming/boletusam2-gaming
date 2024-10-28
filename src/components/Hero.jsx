import React from 'react';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">

        <div className="overlay"></div>
        <div className="hero-text">
            <h1>Boletusam2 Gaming</h1>
            <p>Coming Soon...</p>
            <button className="stream">
                <a href="/livestream">Live Stream</a>
            </button>
        </div>  
    </section>
  );
}
export default Hero;