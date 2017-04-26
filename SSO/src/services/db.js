// @flow
const cache: Object = Object.create(null);
const fiveMin = 10 * 24 * 1000;

const obj = {
  getCachedDBQuery(recoveryToken: string): ?string {
    return cache[recoveryToken];
  },
  cacheDBQuery({ recoveryToken, user }: { recoveryToken: string, user: Object } = {}) {
    cache[recoveryToken] = user;
    setTimeout(() => {
      delete cache[recoveryToken];
    }, fiveMin);
  }
};

export default obj;
