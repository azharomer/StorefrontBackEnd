import { body, CustomValidator, ValidationChain } from 'express-validator';
import { ProductStore } from '../../../models/product.model';
import OrderProduct from '../../types/orderProducts.type';

const isFoundProduct: CustomValidator = (value: string) => {
  const product_id: number = parseInt(value);
  const Product: ProductStore = new ProductStore();
  return Product.findProductById(product_id).then(found =>
    !found ? Promise.reject('Product Not Found') : null
  );
};

const isaddProductmoretime: CustomValidator = (value: string, { req }) => {
  const product_id: number = parseInt(value);
  const found: boolean =
    req.body.products.filter(
      (item: OrderProduct) => item.product_id == product_id
    ).length > 1;
  console.log(found, req.body.products);
  return found ? Promise.reject('Product already exist in list') : true;
};

const orderValidation: ValidationChain[] = [
  body('products')
    .isArray({ min: 1 })
    .withMessage('Products list required to ceate new order')
    .notEmpty()
    .withMessage('Products list  must have at least one product'),
  body('products.*.product_id')
    .trim()
    .notEmpty()
    .withMessage('Product ID Required')
    .bail()
    .isInt()
    .toInt()
    .withMessage('Product ID should be numeric')
    .bail()
    .custom(isFoundProduct)
    .bail()
    .custom(isaddProductmoretime),
  body('products.*.quantity')
    .trim()
    .notEmpty()
    .withMessage('quantity Required')
    .bail()
    .isInt({ min: 1 })
    .toInt()
    .withMessage('Product Price Required'),
];

export default {
  orderValidation: orderValidation,
};
