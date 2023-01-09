import express, { Router } from 'express';
import {
  addProduct,
  completed,
  confirmOrder,
  create,
  current,
  deleteOrder,
  index,
  show,
} from '../../controllers/orderController';
import middlewares from '../middlewares';
import validationRules from '../../utilities/validation/order_products/order_products.validation.rules';
import validationOrderRules from '../../utilities/validation/order/order.validation.rules';

const ordersRoute: Router = express.Router();

ordersRoute
  .route('/')
  .get(index)
  .post(middlewares.validation(validationOrderRules.orderValidation), create);
ordersRoute.route('/completed').get(completed);
ordersRoute.route('/current').get(current);
ordersRoute
  .route('/:id')
  .get(middlewares.validateOrderId, show)
  .delete(
    middlewares.validateOrderId,
    middlewares.validateOrderCanEdit,
    deleteOrder
  );
ordersRoute
  .route('/:id/confirm')
  .post(
    middlewares.validateOrderId,
    middlewares.validateOrderCanEdit,
    confirmOrder
  );

ordersRoute
  .route('/:id/addproduct')
  .post(
    middlewares.validateOrderId,
    middlewares.validateOrderCanEdit,
    middlewares.validation(validationRules.orderProductValidation),
    addProduct
  );

export default ordersRoute;
