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

  constructor(url: string) {
    this.url = url;
    this.defaultConfig = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    };
  }

  signin({ user, password }: { user: string, password: string }): Promise<LoggedInType> {
    const config = {
      ...this.defaultConfig,
      body: JSON.stringify({
        user,
        password
      })
    };
    return fetch(`${this.url}/auth/login`, config)
      .then(response => {
        // const contentType = response.headers.get('content-type');
        // if (contentType && contentType.includes('application/json')) {
        return response.json();
        // }
        // return response.text();
      })
      .catch(e => e);
  }

  signup({ user, email, password }: { user: string, email: string, password: string }): Promise<*> {
    const config = {
      ...this.defaultConfig,
      body: JSON.stringify({
        email,
        user,
        password
      })
    };
    return fetch(`${this.url}/auth/signup`, config)
      .then(response => {
        // const contentType = response.headers.get('content-type');
        // if (contentType && contentType.includes('application/json')) {
        return response.json();
        // }
        // return response.text();
      })
      .catch(e => e);
  }

  static createApi() {
    const url = 'http://localhost:3000/api/v1';
    return new Api(url);
  }
}

export default Api.createApi();
