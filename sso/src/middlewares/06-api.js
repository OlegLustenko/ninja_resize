// @flow

export default async (ctx, next) => {
  ctx.api = (status: number = 200, options: any = {}): void => {
    ctx.status = status;
    ctx.body = { status: 'success', message: { ...options } };
  };
  ctx.log = {
    error({ err }, message) {
      console.log('\x1b[33m%s\x1b[0m \x1b[31m%s\x1b[0m', err, message);
    }
  };
  await next();
};
