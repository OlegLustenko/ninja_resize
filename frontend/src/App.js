import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import api from './service/api';
import Login from './Login';
import Signup from './Signup';
import Uploads from './Uploads';

import './App.css';

class App extends Component {
  state: {
    userName: string
  };
  constructor() {
    super();
    this.state = {
      userName: 'no auth yet'
    };
  }

  async componentDidMount() {
    const loggedIn = (await api.login()).message;
    if (!loggedIn.token) {
      this.setState({ user: loggedIn });
      return;
    }
    const { user } = loggedIn;
    api.jwt(loggedIn.token, user);
    this.setState({ userName: user.name });
  }

  async login(userForm, passwordForm) {
    const loggedIn = (await api.login(userForm, passwordForm)).message;
    if (!loggedIn.token) {
      this.setState({ user: loggedIn });
      return;
    }
    const { user } = loggedIn;
    api.jwt(loggedIn.token, user);
    this.setState({ userName: user.name });
  }

  render() {
    const { userName } = this.state;
    const { login } = this;
    return (
      <Router>
        <div>
          <nav className="Navbar-header">
            <div className="Navbar__header-item nav">
              <Link to="/signup" className="nav__item">signup</Link>
              <Link to="/login" className="nav__item">
                login
              </Link>
              <Link to="/uploads" className="nav__item">uploads</Link>
            </div>
            <pre className="Navbar__header-item">{userName}</pre>
          </nav>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} test="www" />
          <Route path="/uploads" component={Uploads} />
        </div>
      </Router>
    );
  }
}

export default App;

type UserAuthType = {
  _id: string,
  email: string,
  name: string,
  role: string
};

type LoggedInMessageType = string | { token: string, user: UserAuthType };
