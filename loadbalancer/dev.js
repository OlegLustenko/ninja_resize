/* eslint-disable */

require('babel-register');
if (process.env.NODE_ENV === 'dev') {
  require('dotenv').config();
}
require('./src/app');
