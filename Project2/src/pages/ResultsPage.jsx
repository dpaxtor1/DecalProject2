import React, { useEffect, useState } from 'react';

function ResultsPage() {
    const [authorizationCode, setAuthorizationCode] = useState('');
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState(null);

    // Mock data for top artists
    const mockArtists = [
        { id: 1, name: 'Artist 1', genres: ['Pop', 'Rock'], popularity: 90 },
        { id: 2, name: 'Artist 2', genres: ['Jazz'], popularity: 85 },
        { id: 3, name: 'Artist 3', genres: ['Classical'], popularity: 80 },
        { id: 4, name: 'Artist 4', genres: ['Hip Hop'], popularity: 75 },
        { id: 5, name: 'Artist 5', genres: ['Indie'], popularity: 70 },
    ];

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            setAuthorizationCode(code);
            // Simulate fetching artists (replace this with actual API call later)
            setArtists(mockArtists);
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
                    {artists.map((artist) => (
                        <li key={artist.id}>
                            <p>Name: {artist.name}</p>
                            <p>Genres: {artist.genres.join(', ')}</p>
                            <p>Popularity: {artist.popularity}</p>
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



