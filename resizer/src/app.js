// @flow

import Koa from 'koa';
import mount from 'koa-mount';
import fs from 'fs';
import path from 'path';

import APIModules from './modules/API-modules';

const { port } = require('rc')('loadbalancer');

const app = new Koa();

const middlewares = fs.readdirSync(path.join(__dirname, './middlewares')).sort();

middlewares.forEach(middleware => {
  // eslint-disable-next-line
  app.use(require(`./middlewares/${middleware}`).default);
});

app.use(mount('/api/v1/resizer', APIModules));
app.listen(port, () => {
  console.log('server running at localhost:%s', port);
});
