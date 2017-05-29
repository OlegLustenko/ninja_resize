// @flow
import Koa from 'koa';
import router from 'koa-route';

const UploadModule = new Koa();

UploadModule.use(
  router.get('/', ctx => {
    ctx.body = 'Hello upload module';
  })
);

UploadModule.use(
  router.post('/', ctx => {
    ctx.body = 'Hello upload module';
  })
);

export default UploadModule;
