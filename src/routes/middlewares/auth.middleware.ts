import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import app from '../../config/app';
import Error from '../../utilities/interfaces/error.interface';

const errorHandler = (next: NextFunction) => {
  const error: Error = new Error(' Access denied, Please Login');
  error.status = 401;
  return next(error);
};

const verifyAuthToken = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader: string = req.headers
      .authorization as unknown as string;
    if (authorizationHeader) {
      const authArr: string[] = authorizationHeader.split(' ');
      const bearer: boolean =
        authArr[0].toLowerCase() === 'bearer' ? true : false;
      if (bearer && authArr[1]) {
        const decoded: string | JwtPayload = jwt.verify(
          authArr[1],
          app.token as unknown as string
        );
        if (decoded) {
          const id: number = (decoded as JwtPayload).id;
          req.body.user_id = id;
          return next();
        }
      }
      errorHandler(next);
    } else {
      errorHandler(next);
    }
  } catch (err) {
    errorHandler(next);
  }
};

export default verifyAuthToken;
