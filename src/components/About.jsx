import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-intro">
        <h2>About Boletusam2 Gaming</h2>
        <p>Boletusam2 Gaming is your ultimate destination for the latest in gaming news, reviews, and live streams. Our passion for gaming drives us to bring you the best content from the gaming world.</p>
      </section>
      <section className="our-mission">
        <h2>Our Mission</h2>
        <p>To create a community of gaming enthusiasts who share our love for games. We aim to provide engaging and informative content to keep our audience entertained and informed.</p>
      </section>
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-member">
          <h3>Hafiz Ahmed</h3>
          <p>Founder & Lead Streamer</p>
        </div>
        {/* Add more team members as needed */}
      </section>
    </div>
  );
}

export default About;
