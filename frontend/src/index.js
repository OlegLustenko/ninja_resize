import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';
import { AUTH_USER } from './actions/types';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need update application state
  store.dispatch({ type: AUTH_USER });
}
const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Component />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
};

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default;
    render(NewApp);
  });

  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default;
    store.replaceReducer(nextReducer);
  });
}

render(App);
