/* eslint-disable consistent-return*/
import asyncBusboy from 'async-busboy';
import fs from 'fs';

export default async (ctx, next) => {
  if (!ctx.request.is('multipart/*')) {
    // eslint-disable-next-line
    return await next();
  }
  const { files } = await asyncBusboy(ctx.req);
  if (files) {
    files.forEach(x => {
      console.log(x);
    });
  }
  // if (files) {
  //   for (const file of files) {
  //     fs.createWriteStream()
  //   }
  // }

  await next();
};
