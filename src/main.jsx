import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main App component
import './index.css'; // Styles for the app

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App /> {/* Render App component */}
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function