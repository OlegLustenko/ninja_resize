import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
// import api from '../service/api';
import Login from '../containers/Login';
import Signin from './auth/signin';
import Signup from './Signup';
import Uploads from './Uploads';

import './Header.css';

class Header extends Component {
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
    // const loggedIn = (await api.login({ user: 'admin', password: 'admin' })).message;
    // if (!loggedIn.token) {
    //   this.setState({ user: loggedIn });
    //   return;
    // }
    // const { user } = loggedIn;
    // this.setState({ userName: user.name });
  }

  async login(userForm, passwordForm) {
    // const loggedIn = (await api.login(userForm, passwordForm)).message;
    // if (!loggedIn.token) {
    //   this.setState({ user: loggedIn });
    //   return;
    // }
    // const { user } = loggedIn;
    // api.jwt(loggedIn.token, user);
    // this.setState({ userName: user.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <div>
        <nav className="Navbar-header">
          <div className="Navbar__header-item nav">
            <Link to="/signup" className="nav__item">signup</Link>
            <Link to="/login" className="nav__item">
              Login
            </Link>
            <Link to="/signin" className="nav__item">
              Sign in
            </Link>
            <Link to="/uploads" className="nav__item">uploads</Link>
          </div>
          <pre className="Navbar__header-item">{userName}</pre>
        </nav>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} test="www" />
        <Route path="/signin" component={Signin} test="www" />
        <Route path="/uploads" component={Uploads} />
      </div>
    );
  }
}

export default Header;

type UserAuthType = {
  _id: string,
  email: string,
  name: string,
  role: string
};

type LoggedInMessageType = string | { token: string, user: UserAuthType };
