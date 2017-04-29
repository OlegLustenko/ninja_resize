import Koa from 'koa';
import fs from 'fs';
import { join } from 'path';
import { HOST, PORT } from 'config';
import mount from 'koa-mount';
import database from './libs/mongoose';
import APIModules from './modules/API-modules';

database();

const app = new Koa();
const middlewares = fs.readdirSync(join(__dirname, './middlewares')).sort();

middlewares.forEach(middleware => {
  // eslint-disable-next-line
  app.use(require(`./middlewares/${middleware}`).default);
});

app.use(mount('/api/v1', APIModules));

app.use((ctx, next) => {
  ctx.body = 'Hello world !';
});

app.listen(PORT, HOST, () => {
  console.log('server running at %s:%s', HOST, PORT);
});
