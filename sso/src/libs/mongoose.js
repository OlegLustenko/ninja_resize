import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from 'config';
import createEmptyDb from './db/createEmtpyDb';
import fixtures from '../fixtures';
import User from '../models/User';
import Roles from '../models/Roles';

const { users, roles } = fixtures;

async function createFixtures(Model, fixture) {
  await Model.remove({});
  for (let data of fixture) {
    try {
      await Model.create(data);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default () =>
  new Promise((resolve, reject) => {
    if (process.env.MOONGOSE_DEBUG) {
      mongoose.set('debug', true);
    }

    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', async () => {
        await Promise.all[
          (createEmptyDb(), createFixtures(Roles, roles), createFixtures(User, users))
        ];
        resolve(mongoose.connection.db);
        if (config.mongoose.uri.includes('mlab')) {
          console.log('\x1b[36m%s\x1b[0m', 'Connected to MongoLab');
        } else {
          console.log('Server uses local-Database');
        }
      });
    console.log('Database initialization...');

    mongoose.Promise = bluebird;

    mongoose.connect(config.mongoose.uri, config.mongoose.options, err => {
      if (err) {
        console.log(err);
      }
    });
  });
