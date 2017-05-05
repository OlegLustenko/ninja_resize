// @flow

import React from 'react';
import { connect } from 'react-redux';

const Login = props => (
  <div>
    <button>return</button>
    <label>
      <input type="text" placeholder="user" />
    </label>
    <label>
      <input type="text" placeholder="password" />
    </label>
    <button>LOGIN</button>
  </div>
);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(actionCreator)
    }
  }
}

export default connect()(Login);
