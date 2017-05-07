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
    this.props.signinUser({ user, password }, () => {
      this.props.history.push('/uploads');
    });
  }

  alertMessage() {
    return this.props.errorMessage
      ? <ul className="alert alert-danger"><strong>Oops! </strong>{this.props.errorMessage}</ul>
      : '';
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
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>
        {this.alertMessage()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error
  };
};

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'signin',
    fields: ['user', 'password']
  })(Signin)
);
