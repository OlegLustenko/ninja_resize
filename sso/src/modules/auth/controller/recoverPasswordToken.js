// @flow

import User from '../../../models/User';
import DBQueryCache from '../../../services/db';
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
  async post(ctx, recoveryToken: string) {
    bodyValidation(ctx, 'password');
    
    const { password } = ctx.request.body;
    let user = DBQueryCache.getCachedDBQuery(recoveryToken);
    if (!user) {
      user = await User.find({
        where: {
          passwordResetToken: recoveryToken,
          passwordResetTokenExpiries: {
            $lt: Date.now()
          }
        }
      });
      DBQueryCache.cacheDBQuery({ recoveryToken, user });
    }

    if (!user) {
      ctx.throw(500, 'password is incorrect or token expiried');
    }

    if (!user.validPassword(password)) {
      ctx.throw(401, 'password is incorrect');
    }
    ctx.api();
  }
};
