import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGenerate = () => {
    setCount(count + 1); // Increase count
    navigate('/results'); // Navigate to the results page
  };

  return (
    <div>
      <h1>Spotify React</h1>
      <div className="card">
        <p>Current Time: {currentTime}</p>
        <p>Count: {count}</p>
        <button onClick={handleGenerate}>Generate Artists</button>
        <p>
          Generating Artists?: Where we track the number of times a user generates artists at certain times.
          This data can be used for future analysis.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
