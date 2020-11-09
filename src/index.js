import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
