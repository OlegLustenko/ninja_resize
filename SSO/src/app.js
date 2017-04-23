import Koa from 'koa';
import fs from 'fs';
import { join } from 'path';
import { HOST, PORT } from 'config';
import database from './src/libs/mongoose';

const app = new Koa();
const middlewares = fs.readdirSync(join(__dirname, './middlewares')).sort();

middlewares.forEach(middleware => {
  app.use(require(`./middlewares/${middleware}`).default);
});

app.use((ctx, next) => {
  ctx.body = 'Hello world';
});

app.listen(PORT, HOST, () => {
  console.log('server running at %s:%s', HOST, PORT);
});
