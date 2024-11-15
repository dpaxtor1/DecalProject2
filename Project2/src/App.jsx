import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Your main content page
import ResultsPage from './pages/ResultsPage'; // Your results or second page

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;

