// @flow
type UserAuthType = {
  _id: string,
  email: string,
  name: string,
  role: string
};

type LoggedInSuccessType = {
  status: 'success',
  message: {
    token: string,
    user: UserAuthType
  }
};

type LoggedInErrorType = {
  status: 'error',
  message: string
};

type LoggedInType = LoggedInSuccessType | LoggedInErrorType;

type ApiDefaultConfigType = {
  method: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT',
  headers: {
    [string]: string
  },
  body?: string
};

class Api {
  url: string;
  _token: string;
  user: UserAuthType;
  defaultConfig: ApiDefaultConfigType;
  headers: {};

  constructor(url: string) {
    this.url = url;
    this.headers = {};
    this.defaultConfig = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    };
  }

  signin({ user, password }: { user: string, password: string }): Promise<LoggedInType> {
    return this.fetch(`${this.url}/auth/login`, { user, password });
  }

  signup({ user, email, password }: { user: string, email: string, password: string }): Promise<*> {
    return this.fetch(`${this.url}/auth/signup`, {
      email,
      user,
      password
    });
  }

  uploads() {
    return this.fetch(`${this.url}/auth/secret`, {})
  }

  setHeaders(headerName: string, headerValue: string): void {
    this.headers[headerName] = headerValue;
  }

  fetch(url: string, options: Object) {
    const token = localStorage.getItem('token');
    if (token) {
      this.setHeaders('Authorization', `Bearer ${token}`);
    }
    const config = {
      ...this.defaultConfig,
      headers: { ...this.defaultConfig.headers, ...this.headers },
      body: JSON.stringify(options)
    };

    return fetch(url, config)
      .then(response => {
        return response.json();
      })
      .catch(e => e);
  }

  static createApi() {
    const url = 'http://localhost:3000/api/v1';
    return new Api(url);
  }
}

export default Api.createApi();
