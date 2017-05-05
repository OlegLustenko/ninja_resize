import React, { Component } from 'react';

class Signup extends Component {
  render() {
    return (
      <div>
        <label>
          <input type="text" placeholder="user" />
        </label>
        <label>
          <input type="text" placeholder="password" />
        </label>
        <label>
          <input type="email" placeholder="email" />
        </label>
        <button>LOGIN</button>
      </div>
    );
  }
}

export default Signup;
