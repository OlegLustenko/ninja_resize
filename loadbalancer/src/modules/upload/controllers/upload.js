// @flow
import type { Context } from 'koa';

// import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import util from 'util';

const root = process.cwd();
const exist = util.promisify(fs.exists);

export default {
  async post(ctx: Context): Promise<void> {
    const fileFolderPath = path.join(root, '/temp');
    if (exist(fileFolderPath)) {
      fs.mkdirSync(fileFolderPath);
    }
    try {
      ctx.files.forEach((file): void => {
        const writeStream = fs.createWriteStream(path.join(fileFolderPath, file.filename));
        file.pipe(writeStream);
      });
    } catch (e) {
      ctx.body = 'ok';
    }
  }
};
