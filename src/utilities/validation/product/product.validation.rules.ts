import { body, ValidationChain } from 'express-validator';

const productValidation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage(' Product Name required')
    .bail()
    .isString()
    .withMessage(' Product Name should be letters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage(' Product Category required')
    .bail()
    .isString()
    .withMessage('Product Category should be letters'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Product Price Required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Product Price should be number'),
];

export default {
  ProductValidation: productValidation,
};
