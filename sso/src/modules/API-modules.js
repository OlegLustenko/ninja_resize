import Koa from 'koa';
import mount from 'koa-mount';

import AuthModule from './auth/auth-module';

const APIModules = new Koa();

APIModules.use(mount('/auth', AuthModule));

export default APIModules;