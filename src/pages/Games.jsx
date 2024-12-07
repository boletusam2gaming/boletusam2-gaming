// main imports for the games page
import React, {useEffect} from 'react';
import './Games.css';
import { updateTitle } from '../utils/updateTitle';
//importing images for the games
import CODMW3 from '../assets/CODMW3.png'; // src google
import CODBO6 from '../assets/CODBO6.jpg'; // src google
import CODWarzone from '../assets/CODWarzone.jpg'; // src google 


// this is the Array list of games that will be displayed on the games page, that i will be adding to the site
const gamesList = [
    {
        name: 'Call of Duty Modern Warfare 3',
        description: `Modern Warfare 3 brings intense FPS gameplay 
                        and cinematic moments perfect for captivating streams`,
        image: CODMW3,
    },
    {
        name: 'Call of Duty Black Ops 6',
        description: `Black Ops 6 offers fast-paced action and tactical gameplay
                         that keeps audiences engaged during streams.`,
        image: CODBO6
    },
    {
        name: 'Call of Duty Warzone',
        description: `Call of Duty: Warzone delivers intense action and clutch moments that keep viewers hooked. 
              It’s the perfect game for streaming epic battle royale content.`,
        image: CODWarzone
    }



    // Continue adding more games here as needed
    
]

// this is the main function that will be exported to the App.js file to be displayed on the site
const Games = () => {
    useEffect(() => {
        updateTitle("Games");
    }, []);


    return (
    <div className="games-container">
        <h1 className="title">Games</h1>
        <p className="description">
            Here are some of the games we have available on our site that we play on stream.
        </p>
        <div className="game-list">
            {gamesList.map((game, index)=> (
                <div key={index} className="game-card"> 
                    <img src={game.image} alt={game.name} className="game-image" />
                    <h2 className="game-title">{game.name}</h2>
                    <p className="game-description">{game.description}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Games;
