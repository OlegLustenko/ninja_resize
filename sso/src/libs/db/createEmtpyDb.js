import mongoose from 'mongoose';
import log from 'log';
import thunkify from 'thunkify';

log();

export default async () => {
  let db;

  if (mongoose.connection.readyState === 1) {
    // connected
    db = mongoose.connection.db;
  } else {
    db = await thunkify(mongoose.connection.on)('open');
  }

  await clearDatabase(db);
  await ensureIndexes();
  await ensureCapped();
};

async function clearDatabase(db) {
  const collections = await db.listCollections().toArray();
  // var collections = yield new Promise(function(resolve, reject) {
  //   db.listCollections().toArray(function(err, items) {
  //     if (err) return reject(err);
  //     resolve(items);
  //   });
  // });

  const collectionNames = collections
    .map(collection => {
      if (collection.name.indexOf('system.') === 0) {
        return null;
      }
      return collection.name;
    })
    .filter(Boolean);

  collectionNames.map(name => thunkify(db.dropCollection)(name));
}

// wait till indexes are complete, especially unique
// required to throw errors
async function ensureIndexes(db) {
  await mongoose.modelNames().map(modelName => {
    const model = mongoose.models[modelName];
    return thunkify(model.ensureIndexes.bind(model))();
  });
}

// ensure that capped collections are actually capped
async function ensureCapped(db) {
  await mongoose.modelNames().map(modelName => {
    const model = mongoose.models[modelName];

    const schema = model.schema;
    if (!schema.options.capped) return;
    return thunkify(db.command)({
      convertToCapped: model.collection.name,
      size: schema.options.capped
    });
  });
}
