import { Request, Response } from 'express';
import Error from '../../utilities/interfaces/error.interface';

const ErrorHandler = (err: Error, _req: Request, res: Response): void => {
  const status: number = (err.status as unknown as number) || 500;
  const msg: string =
    (err.message as unknown as string) || 'someting wrong try again';
  res.status(status).json({ status, msg });
};

export default ErrorHandler;
