import React, { useState, useEffect } from 'react';
import Hero from './Hero'; // Assuming Hero is another component
import './Home.css';
import { updateTitle } from '../utils/updateTitle'

const Home = () => {
  const [playerInitialized, setPlayerInitialized] = useState(false);
  

  useEffect(() => {
    updateTitle("Home");

    // Load the Twitch embed script only once
    if (!playerInitialized) {
      const script = document.createElement('script');
      script.src = "https://player.twitch.tv/js/embed/v1.js";
      script.async = true;
      script.onload = () => {
        if (!window.twitchPlayer) {
          window.twitchPlayer = new window.Twitch.Player("twitch-embed", {
            video: "759603722",
            parent: ["boletusam2gaming.github.io"],
            width: '100%',
            height: '100%',
          });
        }
        setPlayerInitialized(true);
      };
      document.body.appendChild(script);
    } else {
      if (!window.twitchPlayer) {
        window.twitchPlayer = new window.Twitch.Player("twitch-embed", {
          video: "759603722",
          parent: ["boletusam2gaming.github.io"],
          width: '100%',
          height: '100%',
        });
      }
    }
  }, [playerInitialized]); // Dependency array includes playerInitialized to ensure it runs only once

  // Featured products data fetching



  return (
    <div className="home-container">
      <Hero />
      <section className="welcome-section">
        <h2>Welcome to Boletusam2 Gaming</h2>
        <p>Your ultimate destination for gaming news, reviews, and live streams.</p>
      </section>
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Weekly Gaming Live Streams</li>
          <li>Latest Gaming News and Reviews</li>
          <li>Exclusive Content for Members</li>
        </ul>
      </section>
      <section className="schedule-stream">
        <h2>Stream Schedule</h2>
        <p>Check out our stream schedule below to see when we are live!
          <br />
          For 2 years am away from streaming for vacation, will return soon.
          <br />
          Dont miss out on the Upcoming Stream when i return.
        </p>
        <div className="stream-schedule">
          <div className="stream-day">
            <h3>Monday</h3>
            <p>8:00 PM - 10:00 PM</p>
          </div>
          <div className="stream-day">
            <h3>Tuesday</h3>
            <p>8:00 PM - 10:00 PM</p>
          </div>
          <div className="stream-day">
            <h3>Wednesday</h3>
            <p>8:00 PM - 10:00 PM</p>
          </div>
          <div className="stream-day">
            <h3>Thursday</h3>
            <p>8:00 PM - 10:00 PM</p>
          </div>
          <div className="stream-day">
            <h3>Friday</h3>
            <p>8:00 PM - 10:00 PM</p>
          </div>
        </div>
      </section>

      <section className="past-streams">
        <h2>Past Live Stream From Twitch Below</h2>
        
        <div id="twitch-embed" className="video-container"></div>
      </section>




      <section className="social-media">
        <h2>Follow Us on Social Media</h2>
        <div className="social-links">
          <a href="https://www.youtube.com/@boletusam2gaming" target="_blank" rel="noopener noreferrer" className="youtube">
            YouTube
          </a>
          <a href="https://www.twitch.tv/boletusam2_gaming" target="_blank" rel="noopener noreferrer" className="twitch">
            Twitch
          </a>
          <a href="https://x.com/@boletusam2_g" target="_blank" rel="noopener noreferrer" className="twitter">
            Twitter
          </a>
          <a href="https://www.facebook.com/boletusam2" target="_blank" rel="noopener noreferrer" className="facebook">
            Facebook
          </a>
        </div>
      </section>


    </div>
  );
};

export default Home;
