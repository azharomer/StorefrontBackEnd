import { NextFunction, Request, Response } from 'express';
import {
  ErrorFormatter,
  ValidationChain,
  validationResult,
} from 'express-validator';
import ApiResponse from '../../utilities/interfaces/response.interface';

const validation = (rules: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const allRules = rules.map(rule => rule.run(req));
    await Promise.all(allRules);
    const errorFormatter: ErrorFormatter = ({ msg, param }) => {
      const arr: { [key: string]: string } = {};
      arr[param] = msg;
      return arr;
    };
    const results = validationResult(req).formatWith(errorFormatter);
    if (results.isEmpty()) {
      next();
    } else {
      const data = results.array();
      const result: ApiResponse = {
        success: false,
        msg: 'invalide data ',
        data: data,
      };
      res.json(result);
    }
  };
};

export default validation;
