import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainRound from './views/MainRound';
import FinalRound from './views/FinalRound';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
