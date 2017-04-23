export default async (ctx, next) => {
  try {  
    await next();
  } catch (e) {
    if (e.status) {
      // could use template methods to render error page
      console.log(e.status);
      ctx.status = e.status;
      ctx.body = { status: 'error', message: e.message };
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
      console.error(e.message, e.stack);
    }
  }
};
