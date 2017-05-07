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
      let errFields;
      if (e.errors) {
        Object.keys(e.errors).forEach(field => {
          ctx.log.error({ err: e.errors[field] }, 'signup error');
          errFields = e.errors[field].message;
        });
      } else {
        ctx.log.error({ err: e }, 'signup error');
      }
      ctx.throw(422, errFields || 'Bad credentials.');
    }

    ctx.api(200, { id: user._id, name });
  }
};
