import User from '../../../models/User';
import bodyValidation from '../service/bodyValidation';

export default {
  async post(ctx) {
    bodyValidation(ctx, 'user', 'email', 'password');
    const { user: name, email, password } = ctx.request.body;
    let user;
    try {
      user = await User.create({ name, email, password });
    } catch (e) {
      ctx.log.error({ err: e }, 'signup error');
      ctx.throw(401, 'Bad credentials.');
    }

    ctx.api(200, { data: { id: user._id, name } });
  }
};
