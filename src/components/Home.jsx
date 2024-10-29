import React, {useEffect} from 'react';
import Hero from './Hero'; // Assuming Hero is another component
import './Home.css';
import { updateTitle } from '../utils/updateTitle'

const Home = () => {

  useEffect(() => {
    updateTitle("Home")
  });


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
          <li>24/7 Gaming Live Streams</li>
          <li>Latest Gaming News and Reviews</li>
          <li>Exclusive Content for Members</li>
        </ul>
      </section>
      <section className="schedule-stream">
        <h2>Stream Schedule</h2>
        <p>Check out our stream schedule below to see when we are live!</p>
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
    </div>
  );
}

export default Home;
