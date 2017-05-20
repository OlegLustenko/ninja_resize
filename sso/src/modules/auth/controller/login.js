// @flow

import jwt from 'jsonwebtoken';
import config from 'config';

import User from '../../../models/User';
import bodyValidation from '../service/bodyValidation';

/*
ROUTE - /api/v1/auth/login
  QUERY POST:
  - { user: string, password: string }
  ANSWERS:
   - { status: 'success', token: 'some-token' }
   - { status: 'error', message: 'some-error' }
*/

export default {
  async post(ctx: any) {
    // anti-bruteforce pause
    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });
    bodyValidation(ctx, 'user', 'password');
    const { user: name, password }: { name: string, password: string } = ctx.request.body;
    let user: ?any;
    try {
      user = await User.findOne({ name });
      if (!user) {
        throw new Error();
      }
      user.update({ lastVisited: Date.now() });
    } catch (e) {
      ctx.log.error({ err: e }, 'User not found in DB');
      ctx.throw(401, `No such User ${name}`);
    }
    if (!user.validPassword(password)) {
      ctx.throw(401, 'password is incorrect');
    }
    const jsonUser = user.toJSON();
    ctx.api(201, {
      token: jwt.sign(jsonUser, config.secret, { expiresIn: '1d' }),
      user: jsonUser
    });
    // ctx.body = { status: 'success', token: jwt.sign(user, config.secret, { expiresIn: '1d' }) };
  },
  async get(ctx) {
    ctx.api(200, await User.find({}));
  }
};
