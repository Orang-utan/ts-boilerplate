import * as express from 'express';
import { verify } from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import errorHandler from '../routes/error';
import { JWT_SECRET } from '../utils/config';

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token = req.headers.authorization;
  if (!token)
    return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
  token = token.replace('Bearer ', '');

  return verify(token, JWT_SECRET, async (jwtErr, decoded) => {
    if (jwtErr) {
      return errorHandler(res, 'Your access token is invalid.', 'invalidToken');
    }
    // append decoded id onto request
    const decodedUser = decoded as IUser;

    if (!decodedUser._id)
      return errorHandler(res, 'Your access token is invalid.', 'invalidToken');

    req.userId = decodedUser._id;

    return next();
  });
};

export default auth;
