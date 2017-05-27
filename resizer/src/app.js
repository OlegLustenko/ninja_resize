// @flow

import Koa from 'koa';

const app = new Koa();
const { port } = require('rc')('resizer');

app.listen(port, err => {
  if (err) console.log(err);
  console.log('resizer: ', 'runs on port %s', port);
});
