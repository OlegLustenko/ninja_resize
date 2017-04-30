import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from './service/api';
import Login from './Login';
import Signup from './Signup';
import Uploads from './Uploads';

import './App.css';

type AppStateType = {
  user: string
};

class App extends Component {
  state: AppStateType;
  constructor() {
    super();
    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    api.ping();
    api.login();
  }

  render() {
    const { user } = this.state;
    return (
      <Router>
        <div>
          <nav className="Navbar-header">
            <div className="Navbar__header-item nav">
              <Link to="/signup" className="nav__item">signup</Link>
              <Link to="/login" className="nav__item">login</Link>
              <Link to="/uploads" className="nav__item">uploads</Link>
            </div>
            <pre className="Navbar__header-item">{user} qwe</pre>
          </nav>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/uploads" component={Uploads} />
        </div>
      </Router>
    );
  }
}

export default App;
