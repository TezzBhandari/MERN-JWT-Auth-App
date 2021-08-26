import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Register from './components/Register';
import Login from './components/Login';
import Todos from './components/todos/Todos';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/todos' component={Todos} />
      </Switch>
    </Router>
  );
}

export default App;
