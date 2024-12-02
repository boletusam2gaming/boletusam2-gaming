import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import './HomePage.css';

// Home page component
export const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
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
};

export default HomePage;
