module.exports = {
  mongoose: {
    uri: process.env.MONGO_DB,
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      },
      db: {
        nativeParser: true
      }
    }
  },
  secret: 'Hello world',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 3000
};
