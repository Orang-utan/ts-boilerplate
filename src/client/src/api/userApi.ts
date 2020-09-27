import secureAxios from './core/apiClient';

const signup = ({ firstName, lastName, email, password }: IUserSignup) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/users/signup',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then(() => resolve())
      .catch((err: Error) => reject(err));
  });
};

const login = ({ email, password }: IUserLogin) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/users/login',
      method: 'POST',
      timeout: 0,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};

const fetchMe = (key: string, { accessToken }: { accessToken: string }) => {
  return new Promise((resolve, reject) => {
    secureAxios({
      url: '/api/users/me',
      method: 'GET',
      timeout: 0,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err: Error) => reject(err));
  });
};

export { signup, login, fetchMe };
