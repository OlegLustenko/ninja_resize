import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ user, password }) {
    console.log(user, password);
    console.log(this.props.signinUser);
    this.props.signinUser({ user, password });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label htmlFor="user">Name:</label>
          <Field name="user" component="input" type="text" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password:</label>
          <Field name="password" component="input" type="text" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

export default connect(null, actions)(
  reduxForm({
    form: 'signin',
    fields: ['user', 'password']
  })(Signin)
);
