import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Oculta el warning y error de UNSAFE_componentWillMount en desarrollo
if (import.meta.env.MODE === 'development') {
  const warn = console.warn;
  const error = console.error;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('UNSAFE_componentWillMount')
    ) {
      return;
    }
    warn(...args);
  };
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('UNSAFE_componentWillMount')
    ) {
      return;
    }
    error(...args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
