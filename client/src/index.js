import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './normalize.css';
import GlobalAuthConext from './context/GlobalAuthContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalAuthConext>
      <App />
    </GlobalAuthConext>
  </React.StrictMode>,
  document.getElementById('root')
);
