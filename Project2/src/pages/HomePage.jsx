import { useState, useEffect} from "react";
import './App.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

return (
    <div>
      <h1>Spotify React</h1>
      <div className="card">
      <p>Current Time: {currentTime}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Generate Artists</button>
        <p>
        Generating Artists?: Where we track the number of times a user generates artists at certain times. This data can be used to analyze user behavior and identify popular artists. 
        </p>
      </div>
    </div>
  )
}

export default HomePage;