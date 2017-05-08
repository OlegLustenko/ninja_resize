// @flow

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit: Function;
  constructor() {
    super();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps, () => {
      this.props.history.push('/signin');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops! </strong>{this.props.errorMessage}
        </div>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label htmlFor="user">User Name:</label>
          <Field name="user" component={FieldInput('text', 'user')} />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <Field name="email" component={FieldInput('email', 'email')} />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <Field name="password" component={FieldInput('password', 'password')} />
        </fieldset>
        <fieldset>
          <label htmlFor="passwordConfirm">Confirm Password:</label>
          <Field name="passwordConfirm" component={FieldInput('password', 'passwordConfirm')} />
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

const validate = ({ password, email, passwordConfirm, user }) => {
  const errors = {};
  if (!email) {
    errors.email = 'Please enter an email';
  }
  if (!password) {
    errors.password = 'Please enter an password';
  }
  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirm';
  }
  if (!user) {
    errors.user = 'Please enter an user name';
  }
  if (password !== passwordConfirm) {
    errors.password = 'Password must match';
  }
  return errors;
};

const FieldInput = (type, fieldName) => ({ input, meta }) => [
  <input type={type} {...input} placeholder={fieldName} className="form-control" key={fieldName} />,
  meta.touched && meta.error && <div className="error" key={fieldName + 'Alert'}>{meta.error}</div>
];

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

export default connect(mapStateToProps, actions)(
  reduxForm(
    {
      form: 'signup',
      // fields: ['user', 'email', 'password', 'passwordConfirm'],
      validate
    }
  )(Signup)
);
