import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContentPage from './components/ContentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentPage />} />
      </Routes>
    </Router>
  );
}

export default App;