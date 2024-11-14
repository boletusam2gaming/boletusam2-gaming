import React from 'react';
import YouTubeVideo from '../components/YouTubeVideo'; // Correct path
import './Video.css';


const Videos = () => {
  return (
    <section className="youtube-video-section">
      <h2>Past YouTube Videos Below</h2>

      {/* Render YouTube videos */}
      <div className="youtube-video-container">
        <h3>Video 1</h3>
        <YouTubeVideo videoId="39yS9P43nUU" />
      </div>
      <div className="youtube-video-container">
        <h3>Video 2</h3>
        <YouTubeVideo videoId="ejARaE94Jc4" />
      </div>
      <div className="youtube-video-container">
        <h3>Video 3</h3>
        <YouTubeVideo videoId="Z-qTQHYPfBs" />
      </div>
      {/* Add more as needed */}
    </section>
  );
};

export default Videos;
