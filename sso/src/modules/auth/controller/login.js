// @flow

import type { Context } from 'koa';
import type { TypeOf } from 'flow-io';

import jwt from 'jsonwebtoken';
import config from 'config';
import * as t from 'flow-io';
import { PathReporter } from 'flow-io/lib/reporters/default';

import User from '../../../models/User';

const err = reporter => ({ status: 401, message: `check fields: ${reporter.join(' ')}` });

const LoginTypeImpl = t.$exact({
  user: t.string,
  password: t.string
});

/*
ROUTE - /api/v1/auth/login
  QUERY POST:
  - { user: string, password: string }
  ANSWERS:
   - { status: 'success', token: 'some-token' }
   - { status: 'error', message: 'some-error' }
*/

type LoginType = TypeOf<typeof LoginTypeImpl>;

export default {
  async post(ctx: Context) {
    // anti-bruteforce pause
    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });

    const validation = t.validate(ctx.request.body, LoginTypeImpl);
    let reporter = PathReporter.report(validation);

    // a bit tricky
    if (!reporter[0].includes('No errors!')) {
      reporter = reporter.map(error => error.match(/\/(.*?): (.*?)?$/g)[0]);
      throw err(reporter);
    }

    const { user: name, password }: LoginType = ctx.request.body;
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
