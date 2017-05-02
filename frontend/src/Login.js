import React, { Component } from 'react';

class Login extends Component {
  render() {
    console.log(this.props);
    return (
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
  }
}

export default Login;
