import { body, CustomValidator, ValidationChain } from 'express-validator';
import { UserModelStore } from '../../../models/user.model';

const isValidEmail: CustomValidator = (value: string) => {
  const user = new UserModelStore();
  return user
    .findUserByEmail(value)
    .then(user => (user ? Promise.reject('email already exist') : null));
};

const loginRules: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email required')
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage('invalid email formate'),
  body('password').trim().notEmpty().withMessage('password required'),
];

const RegisterRules: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email required')
    .bail()
    .isEmail()
    .normalizeEmail()
    .withMessage('invalid email formate')
    .bail()
    .custom(isValidEmail),
  body('username').trim().notEmpty().withMessage('username reqired'),
  body('firstname').trim().notEmpty().withMessage('firstname reqired'),
  body('lastname').trim().notEmpty().withMessage('lastname reqired'),
  body('password').trim().notEmpty().withMessage('password Required'),
];

export default {
  loginRules: loginRules,
  RegisterRules: RegisterRules,
};
