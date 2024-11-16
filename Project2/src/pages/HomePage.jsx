import React from 'react';
import '../App.css';

function HomePage() {
    const handleLogin = () => {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const redirectUri = encodeURIComponent(import.meta.env.VITE_SPOTIFY_REDIRECT_URI);
        const scopes = encodeURIComponent('user-top-read');
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
        window.location.href = authUrl; // Redirect user to Spotify login page
    };

    return (
        <div>
            <h1>Welcome to Spotify Top Artists</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    );
}

export default HomePage;


