import mongoose from 'mongoose';
import bluebird from 'bluebird';

const config = require('config').default;

export default () =>
  new Promise((resolve, reject) => {
    if (process.env.MOONGOSE_DEBUG) {
      mongoose.set('debug', true);
    }

    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => {
        console.log('connected to db');
        resolve(mongoose.connections[0]);
      });
    console.log('Database initialization...');

    if (config.mongoose.uri.includes('mlab')) {
      console.log('\x1b[36m%s\x1b[0m', 'Connected to MongoLab');
    } else {
      console.log('Server uses local-Database');
    }
    mongoose.Promise = bluebird;

    mongoose.connect(config.mongoose.uri, config.mongoose.options, err => {
      if (err) {
        console.log(err);
      }
    });
  });
