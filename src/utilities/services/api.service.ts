import { Response } from 'express';
import ApiResponse from '../interfaces/response.interface';

const errorHandler = (res: Response, message: string) => {
  const result: ApiResponse = {
    success: false,
    msg: message,
  };
  res.status(400).json(result);
};

export default errorHandler;
