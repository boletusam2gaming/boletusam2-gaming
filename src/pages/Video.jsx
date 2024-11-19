import React, { useEffect} from 'react';
import './Video.css';
import { updateTitle } from '../utils/updateTitle';


const Videos = () => {
// page title
  useEffect(() => {
    updateTitle("Videos");
  }, []);



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
      <h2>YouTube Videos Below</h2>

      {/* Render YouTube videos */}
      {videoIds.map((video) => (
        // Rendering each YouTube video
        <div key={video.id} className="youtube-video-container"> 
          <h3>{video.title}</h3> 
          <iframe
            width="100%"  // Set the width of the video
            height="400" // Set the height of the video
            src={`https://www.youtube.com/embed/${video.id}`} // Embed YouTube video by updating the ID from the videoIds array
            title={video.title} // Title of the video updated from the videoIds array
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
