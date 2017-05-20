// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    if (this.props.authenticated) {
      return [
        // <li className="nav-item" key="1">
        //   <Link to="/uploads" className="nav-link">uploads</Link>
        // </li>,
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
    const { authenticated } = this.props;
    return (
      <nav className="navbar navbar-light navbar-toggleable-md">
        <Link to="/" className="nav-link navbar-brand">Home</Link>
        <ul className="navbar-nav navbar-collapse mx-auto">
          {this.renderLinks()}
        </ul>
        <h1 className="navbar-brand nav-item">
          {authenticated ? 'authenticated' : 'not authenticated'}
        </h1>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, actions)(Header);
