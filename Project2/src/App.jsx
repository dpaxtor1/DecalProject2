import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // main content page
import ResultsPage from './pages/ResultsPage'; // results page

function App() {
  const [spotifyToken, setSpotifyToken] = useState(null);

  const handleCallback = () => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        setSpotifyToken(token);
        localStorage.setItem('spotifyToken', token); // Store token for later use
        window.location.hash = ''; // Clear the hash from the URL
      }
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage token={spotifyToken} />} />
      </Routes>
    </div>
  );
}

export default App;

