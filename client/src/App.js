import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route>
          <Login />
        </Route>
        <Route>
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
