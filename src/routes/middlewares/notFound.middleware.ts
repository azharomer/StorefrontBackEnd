import { Request, Response } from 'express';

const NotFound = (_req: Request, res: Response): void => {
  res.status(404).json({ message: 'Page Not Found Back to Home' });
};
export default NotFound;
