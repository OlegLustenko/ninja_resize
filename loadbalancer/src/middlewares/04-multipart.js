// @flow

import type { Context } from 'koa';

/* eslint-disable consistent-return*/
import asyncBusboy from 'async-busboy';

export default async (ctx: Context, next: () => Promise<void>) => {
  if (!ctx.request.is('multipart/*')) {
    // eslint-disable-next-line
    return await next();
  }
  const { files }: { files: any } = await asyncBusboy(ctx.req);
  if (files) {
    ctx.files = files;
  }

  await next();
};
