import React, { useEffect, useRef } from 'react';

const YouTubeVideo = ({ videoId }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.YT) {
          createPlayer();
        } else {
          window.onYouTubeIframeAPIReady = createPlayer;
        }
      };
    };

    const createPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        new window.YT.Player(playerRef.current, {
          videoId: videoId,
          width: '100%',
          height: '100%',
          playerVars: { autoplay: 0, controls: 1 }
        });
      }
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      createPlayer();
    }
  }, [videoId]);

  return <div ref={playerRef} className="youtube-video-container"></div>;
};

export default YouTubeVideo;