// @flow

import React from 'react';
import { connect } from 'react-redux';
import Action_LoginUser from '../actions/action_loginUser';

const Login = props => {
  console.log(props);
  return (
    <form>
      <button>return</button>
      <label>
        <input type="text" placeholder="user" />
      </label>
      <label>
        <input type="text" placeholder="password" />
      </label>
      <button>LOGIN</button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    authentificate: state.authentification
  };
};

export default connect(mapStateToProps, Action_LoginUser)(Login);
