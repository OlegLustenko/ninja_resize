import React from 'react';
import api from '../service/api';

// import Header from './Header';

// import './Home.css';

const Home = props => (
  <div>
    <h1>Greetings</h1>
    <button
      onClick={() => {
        api.uploads();
      }}>
      get uploads
    </button>

  </div>
);

export default Home;
