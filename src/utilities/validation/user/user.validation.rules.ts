import { body, CustomValidator, ValidationChain } from 'express-validator';
import { UserModelStore } from '../../../models/user.model';

const isUniqeEmail: CustomValidator = (value: string, { req }) => {
  const user: UserModelStore = new UserModelStore();
  const user_id: number = parseInt(req.body.user_id);
  return user
    .checkEmailUniqe(user_id, value)
    .then(found => (!found ? Promise.reject('email already Used') : null));
};

const userValidation: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email required')
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage('invalid email formate')
    .bail()
    .custom(isUniqeEmail),
  body('username').trim().notEmpty().withMessage('username reqired'),
  body('firstname').trim().notEmpty().withMessage('firstname reqired'),
  body('lastname').trim().notEmpty().withMessage('lastname reqired'),
  body('password').trim().notEmpty().withMessage('password Required'),
];

export default {
  userValidation: userValidation,
};
