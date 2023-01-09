import { NextFunction, Request, Response } from 'express';
import { UserModelStore } from '../../models/user.model';
import User from '../../utilities/types/user.type';
import errorHandler from '../../utilities/services/api.service';

const validateUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const user: UserModelStore = new UserModelStore();
    const found: User | null = await user.findUserById(parseInt(id));
    if (!found) {
      errorHandler(res, 'User Not Found');
    } else {
      next();
    }
  } catch (err) {
    errorHandler(res, 'User Not Found');
  }
};

export default validateUserId;
