// @flow

// import './types';
import type { Dispatch } from 'redux';

import api from '../service/api';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

type UserAuthType = {
  _id: string,
  email: string,
  name: string,
  role: string
};
type SuccessAuthType = {
  user: UserAuthType,
  token: string
};

type AuthErrorActionType = {
  [x: string]: any,
  type: string,
  payload: string
};

const SERVERNOTRESPOND = 'Unexpected token P in JSON at position 0';

export function signinUser(
  { user, password }: { user: string, password: string },
  redirect: Function
): Function {
  return async (dispatch: Dispatch<*>): Promise<*> => {
    // Submit user/password to server
    const signInStatus = await api.signin({ user, password });
    if (signInStatus.status === 'success') {
      // if request is good...
      const { user, token }: SuccessAuthType = signInStatus.message;
      // -- Update State to indicate is authentificated
      dispatch({ type: AUTH_USER, user });
      // -- Save the JWT token
      localStorage.setItem('token', token);
      // -- redirect to the  router '/feature'
      redirect();
    } else {
      // if request is bad ..
      if (signInStatus.message === SERVERNOTRESPOND) {
        dispatch(authError("Can't connect to server, try later"));
      } else {
        dispatch(authError(signInStatus.message));
      }
      // - Show an error to the user
    }
  };
}

export function authError(error: string): AuthErrorActionType {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}

export function signupUser({ user, password, email }) {
  return async (dispatch: Dispatch<*>) => {
    const signupStatus = await api.signup({ user, password, email });
    if(signupStatus.status === 'success'){

    } else {
      dispatch(authError(signupStatus.message))
    }
  };
}
