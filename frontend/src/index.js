import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
}

render(App);
