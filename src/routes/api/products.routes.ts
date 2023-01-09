import express, { Router } from 'express';
import {
  create,
  deleteProduct,
  getProductsByCategory,
  index,
  popularProduct,
  show,
  update,
} from '../../controllers/productController';
import middlewares from '../middlewares';
import validationRules from '../../utilities/validation/product/product.validation.rules';

const producsRoute: Router = express.Router();

producsRoute
  .route('/')
  .get(index)
  .post(
    middlewares.verifyAuthToken,
    middlewares.validation(validationRules.ProductValidation),
    create
  );
producsRoute.route('/top').get(popularProduct);
producsRoute
  .route('/:id')
  .get(middlewares.validateProductId, show)
  .patch(
    middlewares.verifyAuthToken,
    middlewares.validateProductId,
    middlewares.validation(validationRules.ProductValidation),
    update
  )
  .delete(
    middlewares.validateProductId,
    middlewares.validateCanDeleteProduct,
    deleteProduct
  );

producsRoute.route('/cat/:category').get(getProductsByCategory);

export default producsRoute;
