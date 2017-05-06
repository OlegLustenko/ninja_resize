// @flow

// import './types';
import api from '../service/api';

export function signinUser({ user, password }: { name: string, password: string }) {
  return async dispatch => {
    console.log(user, password, arguments);
    // Submit user/password to server
    const signInStatus = await api.signin({ user, password });
    if (!signInStatus.token) {
      // if request is good...
      // -- Update State to indicate is authentificated
      // -- Save the JWT token
      // -- redirect to the  router '/feature'
    } else {
      // if request is bad ..
      // - Show an error to the user
    }
  };
}
