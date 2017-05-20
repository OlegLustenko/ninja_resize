import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Signout from './auth/signout';
import Uploads from './Uploads';
import RequireAuth from './auth/require_auth';

const SecretUploads = RequireAuth(Uploads);

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={Signup} />
    <Route path="/signout" component={Signout} />
    <Route path="/signin" component={Signin} />
    <Route path="/uploads" component={SecretUploads} />
  </Switch>
);
