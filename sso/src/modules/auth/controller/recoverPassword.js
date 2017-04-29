import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../../../models/User';

import bodyValidation from '../service/bodyValidation';
/*
ROUTE /api/v1/auth/recover-password
  QUERY POST:
   - { email: string }
  ANSWERS:
   - { status: 'success', token: 'some-token' }
   - { status: 'error', message: 'some-error' }
*/
export default {
  async post(ctx) {
    bodyValidation(ctx, 'email');
    const { email } = ctx.request.body;
    const user = await User.find({ where: { email } });
    if (!user) {
      ctx.throw(500, 'user not found');
    }
    const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '1d' });
    const oneDay = 60 * 60 * 24 * 1000;
    try {
      // db.sequelize.transaction(t =>
      user.update({ passwordResetToken: token, passwordResetTokenExpiries: Date.now() + oneDay });
      ctx.api(200, { token });
    } catch (e) {
      ctx.log.error({ err: e }, 'Transaction failed');
      ctx.throw(500, 'connection to db is broken');
    }
  }
};
