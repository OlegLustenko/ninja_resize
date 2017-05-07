import Koa from 'koa';
import router from 'koa-route';
import koajwt from 'koa-jwt';
import config from 'config';

import login from './controller/login';
import signup from './controller/signup';
import recoverPassword from './controller/recoverPassword';
import recoverPasswordToken from './controller/recoverPasswordToken';

const AuthModule = new Koa();
AuthModule.use(router.post('/login', login.post));
AuthModule.use(router.post('/login', login.get));
AuthModule.use(router.post('/recover-password', recoverPassword.post));
AuthModule.use(router.post('/signup', signup.post));

AuthModule.use(koajwt({ secret: config.secret, algorithm: 'HS256' }));
AuthModule.use(router.post('/recover-password/:recoverToken', recoverPasswordToken.post));

export default AuthModule;
