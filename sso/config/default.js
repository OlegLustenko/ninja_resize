module.exports = {
  mongoose: {
    uri: process.env.MONGO_DB || 'mongodb://sa:sa@ds117311.mlab.com:17311/ninja-resize',
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
  PORT: process.env.PORT || 3001
};
