import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [count, setCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const navigate = useNavigate();
  
    const handleSpotifyLogin = () => {
      const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
      const scope = 'user-read-private playlist-read-private'; // Adjust scope based on your requirements
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scope)}`;
      window.location.href = spotifyAuthUrl; // Redirect to Spotify's login
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    const handleGenerate = () => {
      setCount(count + 1);
      navigate('/results');
    };
  
    return (
      <div>
        <h1>Spotify React</h1>
        <div className="card">
          <p>Current Time: {currentTime}</p>
          <p>Count: {count}</p>
          <button onClick={handleGenerate}>Generate Artists</button>
          <button onClick={handleSpotifyLogin}>Login with Spotify</button>
          <p>
            Generating Artists?: Where we track the number of times a user generates artists at certain times.
            This data can be used for future analysis.
          </p>
        </div>
      </div>
    );
}

export default HomePage;
