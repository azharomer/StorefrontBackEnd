import { body, CustomValidator, ValidationChain } from 'express-validator';
import { OrderStore } from '../../../models/order.model';
import { ProductStore } from '../../../models/product.model';

const isFoundProduct: CustomValidator = (value: string) => {
  const product_id: number = parseInt(value);
  const Product: ProductStore = new ProductStore();
  return Product.findProductById(product_id).then(found =>
    !found ? Promise.reject('Product Not Found') : null
  );
};

const isFoundProductInOrder: CustomValidator = (value: string, { req }) => {
  const product_id: number = parseInt(value);
  const order_id: number = parseInt(req.params?.id);
  const Order: OrderStore = new OrderStore();
  return Order.findOderProductById(order_id, product_id).then(found =>
    found ? Promise.reject('Product already found in Order') : null
  );
};

const orderProductValidation: ValidationChain[] = [
  body('product_id')
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
    .custom(isFoundProductInOrder),
  body('quantity')
    .trim()
    .notEmpty()
    .withMessage('quantity Required')
    .bail()
    .isInt()
    .toInt()
    .withMessage('Product quantity Required'),
];

export default {
  orderProductValidation: orderProductValidation,
};
