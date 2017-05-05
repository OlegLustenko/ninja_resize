// @flow
import type { Dispatch } from 'redux';

import Api from '../service/api';
import { LOGIN_REQUEST } from './types';

const requestLogin = () => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthentificated: false
});

export default (credentials: { user: string, password: string }) => (dispatch: Dispatch<*>) => {
  dispatch(requestLogin(credentials));
  return Api.login(credentials);
};
