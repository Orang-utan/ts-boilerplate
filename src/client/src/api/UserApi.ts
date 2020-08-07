import axios from 'axios';
import { ENDPOINT } from '../utils/config';

interface UserSignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

const signup = ({ firstName, lastName, email, password }: UserSignup) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${ENDPOINT}/api/users/signup`,
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

const login = ({ email, password }: UserLogin) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${ENDPOINT}/api/users/login`,
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

export { signup, login };
