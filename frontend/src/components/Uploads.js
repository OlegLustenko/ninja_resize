import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Uploads extends Component {
  render() {
    return (
      <ul>
        Secret feature route Uploads
      </ul>
    );
  }
}

export default connect(null, actions)(Uploads);
