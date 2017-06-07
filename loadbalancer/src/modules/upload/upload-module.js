// @flow
import Koa from 'koa';
import router from 'koa-route';
import koajwt from 'koa-jwt';

import upload from './controllers/upload';

const { secret } = require('rc')('loadbalancer');

const UploadModule = new Koa();

UploadModule.use(
  router.get('/hello', ctx => {
    ctx.status = 200;
  })
);

UploadModule.use(koajwt({ secret, algorithm: 'HS256' }));
UploadModule.use(router.post('/', upload.post));

export default UploadModule;
