import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Importing App.js, which is our core application
import App from './App';
import reportWebVitals from './reportWebVitals';


// Render function displays the webapp and appends it to the part of the document with Id "root"
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

