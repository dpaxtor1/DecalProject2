import React, { useState, useEffect } from 'react';

function ResultsPage() {
  const [authorizationCode, setAuthorizationCode] = useState('');
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      setAuthorizationCode(code);

      // Replace mock artists with backend API call
      const fetchArtists = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/get-tokens');
          const data = await response.json();
          setArtists(data); // Example: Transform tokens into artist data
        } catch (err) {
          setError('Error fetching data');
        }
      };

      fetchArtists();
    } else {
      setError('Authorization code not found. Please log in again.');
    }
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Top Artists</h1>
      {authorizationCode && <p>Authorization Code: {authorizationCode}</p>}
      {artists.length > 0 ? (
        <ul>
          {artists.map((artist, index) => (
            <li key={index}>
              <p>Name: {artist.name || 'N/A'}</p>
              <p>Genres: {artist.genres?.join(', ') || 'N/A'}</p>
              <p>Popularity: {artist.popularity || 'N/A'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No artists found.</p>
      )}
    </div>
  );
}

export default ResultsPage;


