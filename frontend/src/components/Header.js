import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Home from './Home';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Signout from './auth/signout';
import Uploads from './Uploads';

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

  renderLinks() {
    if (this.props.authentificated) {
      return [
        <li className="nav-item" key="1">
          <Link to="/uploads" className="nav-link">uploads</Link>
        </li>,
        <li className="nav-item" key="2">
          <Link to="/signout" className="nav-link btn btn-outline-success my-2 my-sm-0">
            Sign out
          </Link>
        </li>
      ];
    }
    return [
      <li className="nav-item" key="1">
        <Link to="/signup" className="nav-link">Sign up</Link>
      </li>,
      <li className="nav-item" key="2">
        <Link to="/signin" className="nav-link">Sign in</Link>
      </li>
    ];
  }

  render() {
    const { authentificated } = this.props;
    return (
      <Router>
        <div>
          <nav className="navbar navbar-light navbar-toggleable-md">
            <Link to="/" className="nav-link navbar-brand">Home</Link>
            <ul className="navbar-nav navbar-collapse mx-auto">
              {this.renderLinks()}
            </ul>
            <h1 className="navbar-brand nav-item">
              {authentificated ? 'authentificated' : 'not authentificated'}
            </h1>
          </nav>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/uploads" component={Uploads} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentificated: state.auth.authentificated
  };
};

export default connect(mapStateToProps, actions)(Header);
