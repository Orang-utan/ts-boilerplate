import { sign, verify } from 'jsonwebtoken';
import * as _ from 'lodash';
import { User, IUser } from '../models/user.model';
import { JWT_SECRET } from '../utils/config';

class AuthError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

const generateAccessToken = (user: IUser): string =>
  sign(_.omit(user.toObject(), 'password'), JWT_SECRET, {
    expiresIn: '5 s', // for testing purposes
  });

const generateRefreshToken = (user: IUser): any => {
  const refreshToken = sign({ type: 'refresh' }, JWT_SECRET, {
    expiresIn: '9999 years',
  });

  return User.findOneAndUpdate({ email: user.email }, { refreshToken })
    .then(() => refreshToken)
    .catch((err) => {
      throw err;
    });
};

const validateRefreshToken = (refreshToken: string): Promise<any> =>
  new Promise((res, rej) => {
    verify(refreshToken, JWT_SECRET, (err) => {
      if (err) {
        rej(new AuthError('refreshExpired', 'Refresh token expired'));
      } else {
        User.findOne({ refreshToken })
          .then((user) => {
            if (!user) {
              rej(new AuthError('invalidToken', 'Refresh token invalid'));
            }
            res(user);
          })
          .catch((e) => {
            rej(e);
          });
      }
    });
  });

export { generateAccessToken, generateRefreshToken, validateRefreshToken };
