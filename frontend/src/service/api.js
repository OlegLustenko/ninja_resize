// @flow
type UserAuthType = {
  _id: string,
  email: string,
  name: string,
  role: string
};

type LoggedInType = {
  status: string,
  message: string | { token: string, user: UserAuthType }
};

class Api {
  url: string;
  _token: string;
  user: UserAuthType;

  constructor(url: string) {
    this.url = url;
  }

  get token(): string {
    return this._token;
  }

  set token(token: string): void {
    this._token = token;
  }

  jwt(token: string, user: UserAuthType): void {
    this.token = token;
    this.user = user;
  }

  login(user: string, password: string): Promise<LoggedInType> {
    return fetch(`${this.url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user,
        password
      })
    })
      .then(x => x.json())
      .catch(e => e.json());
  }

  static createApi() {
    const url = 'http://localhost:3000/api/v1';
    return new Api(url);
  }
}

export default Api.createApi();
