import React,  { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <StrictMode>
    {/* <BrowserRouter basename="/spaceships"/> */}
   <Router basename="/spaceships">
    <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

