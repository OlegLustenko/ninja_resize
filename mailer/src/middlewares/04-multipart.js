/* eslint-disable consistent-return*/
import asyncBusboy from 'async-busboy'

export default async (ctx, next) => {
  if (!ctx.request.is('multipart/*')) {
    // eslint-disable-next-line
    return await next()
  }
  const { files } = await asyncBusboy(ctx.req)

  if (files) {
    files.forEach((_, index) => {
      console.log(index)
    })
  }
  // console.log(fields);
  // Object.keys(fields).forEach(key => {
  //   ctx.request.body[key] = fields[key];
  // });

  await next()
}
