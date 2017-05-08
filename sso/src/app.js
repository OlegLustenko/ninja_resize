import Koa from 'koa';
import fs from 'fs';
import { join } from 'path';
import { HOST, PORT } from 'config';
import mount from 'koa-mount';
import database from './libs/mongoose';
import APIModules from './modules/API-modules';

(async () => {
  await database();
})();

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
console.log(PORT);
app.listen(PORT, err => {
  if (err) throw new Error(err);
  console.log('server running at %s:%s', HOST, PORT);
});
