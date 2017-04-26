import User from '../../../models/User';
import bodyValidation from '../service/bodyValidation';

export default {
  async post(ctx) {
    bodyValidation(ctx, 'user', 'email', 'password');
    const { user: name, email, password } = ctx.request.body;
    console.log(name, email, password);
    const user = await User.create({ name, email, password });
    ctx.body = user;
  }
};
