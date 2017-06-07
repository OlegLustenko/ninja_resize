const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MSwiX3BsYWluUGFzc3dvcmQiOiIkMmEkMDgkVUVLcGZpL25Gam0zeTFOQ2xVUTdVZ
Ws5Z0dZSmNkSHVHYm41ckFXWVVmVXg1aUZ0QS9vLkMiLCJlbWFpbCI6Im9sZWdsdXN0ZW5rb0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJsYXN0VmlzaXRlZCI6IjIwMTctMDQtMTRUMDY
6MTA6NTYuOTc1WiIsInBhc3N3b3JkUmVzZXRUb2tlbiI6bnVsbCwicGFzc3dvcmRSZXNldFRva2VuRXhwaXJpZXMiOm51bGwsInJlc3RvcmVQYXNzd29yZCI6bnVsbCwiY3JlYXRlZEF0IjoiM
jAxNy0wNC0xM1QxNDo1NjoyNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAxNy0wNC0xNFQwNjoxMDo1Ni4wMDBaIiwiaWF0IjoxNDkyMTUwMjU3LCJleHAiOjE0OTIyMzY2NTd9.oFdobgx0kDghDc
RhS0ahVHnYLGaYeU543qd8FkcKgdM`;
import test from 'ava';
import request from 'supertest';
import proxyquire from 'proxyquire';
import Koa from 'koa';
import mount from 'koa-mount';
import router from 'koa-route';
import jwt from 'jsonwebtoken';
import multipart from '../../../middlewares/04-multipart';
import bodyparser from 'koa-bodyparser';

let app;

test.beforeEach(() => {
  app = undefined;
  app = new Koa();
  app.use(multipart);
});

test('atomic middlewares works fine', t => {
  app.use(
    router.get('/', ctx => {
      ctx.status = 200;
    })
  );
  request(app.listen()).get('/').expect(200);
});

test('');
