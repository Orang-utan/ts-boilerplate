import { verify } from 'jsonwebtoken';
import '../utils/config';
import * as express from 'express';
import errorHandler from '../routes/error';
import { IUser } from '../models/user.model';

const { JWT_SECRET } = process.env;

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token = req.headers.authorization;
  if (!token)
    return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
  token = token.replace('Bearer ', '');

  return verify(token, JWT_SECRET!, (jwtErr, decoded) => {
    if (jwtErr) {
      return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
    }
    // append decoded id onto request
    const decodedUser = decoded as IUser;
    req.userId = decodedUser._id;

    return next();
  });
};

export default auth;
