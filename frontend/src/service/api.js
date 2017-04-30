// @flow
class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async ping() {
    return await fetch(this.url);
  }

  async login() {
    return await fetch('/api/v1/auth/login').then(r=>r.json())
  }

  static createApi() {
    const url = 'http://localhost:3000';
    return new Api(url);
  }
}

export default Api.createApi();
