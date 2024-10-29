import React, {useEffect} from 'react';
import GoogleForm from './GoogleForm';
import './Forum.css';
  import { updateTitle } from '../utils/updateTitle';

const Forum = () => {

  useEffect(() => {
    updateTitle("Forums")
  })


  
  const topics = [
    { id: 1, title: "Welcome to the Forum", author: "Admin", date: "2024-10-01", replies: 5 },
    { id: 2, title: "Game Recommendations", author: "User123", date: "2024-10-02", replies: 12 },
    { id: 3, title: "Best RPG Games of 2024", author: "GamerGirl", date: "2024-10-03", replies: 8 },
    { id: 4, title: "Upcoming Game Releases", author: "GameGuru", date: "2024-10-04", replies: 15 },
  ];

  return (
    <div className="forum-container">
      <h2>Community Forum</h2>
      <p>Welcome to the community forum! Feel free to start a new topic or join existing discussions.</p>
      
      <GoogleForm />  {/* Add this line to embed the Google Form */}

      <div className="topics">
        {topics.map(topic => (
          <div key={topic.id} className="topic">
            <h3>{topic.title}</h3>
            <p>Started by {topic.author} on {new Date(topic.date).toLocaleDateString()}</p>
            <p>{topic.replies} replies</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forum;
