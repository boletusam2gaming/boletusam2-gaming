import React, { useEffect, useRef } from 'react';
import "./LiveStream.css";

export const LiveStream = () => {
  const embedRef = useRef(null);

  useEffect(() => {
    if (!embedRef.current) {
      const script = document.createElement('script');
      script.src = "https://embed.twitch.tv/embed/v1.js";
      script.addEventListener('load', () => {
        new window.Twitch.Embed("twitch-embed", {
          width: 1900,
          height: 800,
          channel: "Boletusam2_Gaming",
        });
      });
      document.body.appendChild(script);
      embedRef.current = true;  // Mark as initialized
    }
  }, []);

  return (
    <div className="livestream-page">
      <div id="twitch-embed"></div>
    </div>
  );
}

export default LiveStream;
