// @flow
import test from 'ava';
import Koa from 'koa';
import request from 'supertest';
import route from 'koa-route';
import path from 'path';
import multipart from '../middlewares/04-multipart';

let app: Koa;

test.beforeEach(() => {
  app = new Koa();
  app.use(multipart);
});

test('app should start', async () => {
  app.use(
    route.get('/', ctx => {
      ctx.status = 200;
    })
  );
  await request(app.listen(3000)).get('/').expect(200);
});

test('ctx should has property files', async t => {
  const { Readable } = require('stream');
  const stream = new Readable();
  app.use(
    route.post('/', ctx => {
      t.truthy(ctx.files);
      // t.true(ctx.files[0] instanceof Readable);
      ctx.status = 200;
    })
  );
  await request(app.listen())
    .post('/')
    .attach('randomFile', path.resolve(__dirname, './fixtures/download.jpg'))
    .expect(200);
});

test('ctx.files[0] should to be a Readable stream', async t => {
  app.use(
    route.post('/', ctx => {
      t.true(ctx.files[0] instanceof require('stream').Readable);
      ctx.status = 200;
    })
  );
  await request(app.listen())
    .post('/')
    .attach('randomFile', path.resolve(__dirname, './fixtures/download.jpg'))
    .expect(200);
});
