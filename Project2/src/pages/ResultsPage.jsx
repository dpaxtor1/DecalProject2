import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResultsPage() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get(
                    'https://api.spotify.com/v1/me/top/artists',
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN}`, // Use Vite's environment variable
                        },
                    }
                );
                setArtists(response.data.items || []);
            } catch (err) {
                setError('Failed to fetch artists');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Generated Results</h1>
            {artists.length > 0 ? (
                <ul>
                    {artists.map((artist, index) => (
                        <li key={artist.id || index}>
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


