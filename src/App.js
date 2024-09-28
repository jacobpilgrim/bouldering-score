import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import MainRound from './views/MainRound';
import FinalRound from './views/FinalRound';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/" exact element={<MainRound />} />
        <Route path="/finals" element={<FinalRound />} />
      </Routes >
    </Router>
  );
};

export default App;