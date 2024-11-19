import React from 'react';
import './Video.css';


const Videos = () => {

  // Array of YouTube video IDs and titles

  const videoIds = [
  {id: "39yS9P43nUU", title: "COD | That Quad Killstreak"},
  {id: "ejARaE94Jc4", title: "Infected...All Came At Once"},
  {id: "Z-qTQHYPfBs", title: "Black ops 3 CTF & TDM"},
  {id: "aUxOAP5Zpsg", title: "Infected | Yolo"},//video placholder
  // Add more video IDs and titles here
  ]



  return (
    //  YouTube videos Container
    <section className="youtube-video-section">
      <h2>Past YouTube Videos Below</h2>

      {/* Render YouTube videos */}
      {videoIds.map((video) => (
        // Rendering each YouTube video
        <div key={video.id} className="youtube-video-container">
          <h3>{video.title}</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </section>
  );
};

// Export the Videos component
export default Videos;
