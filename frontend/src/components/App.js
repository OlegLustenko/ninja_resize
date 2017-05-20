import React from 'react';
import Header from './Header';
import Main from './Main';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

const App = props => (
  <div>
    <Header />
    <Main />
  </div>
);

export default App;
