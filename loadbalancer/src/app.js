// @flow

import Koa from 'koa';
import mount from 'koa-mount';

import APIModules from './modules/API-modules';
import loggerMiddleware from './middlewares/01-logger';
import errorMiddleware from './middlewares/02-error';
import bodyParserMiddleware from './middlewares/03-bodyparser';
import multipart from './middlewares/04-multipart';

const { port } = require('rc')('loadbalancer');

const app = new Koa();
app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use(bodyParserMiddleware);
app.use(multipart);

app.use(mount('/api/v1/loadbalancer', APIModules));
app.listen(port, () => {
  console.log('server running at localhost:%s', port);
});
