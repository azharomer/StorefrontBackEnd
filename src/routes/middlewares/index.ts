import NotFound from './notFound.middleware';
import ErrorHandler from './errorHandler.middleware';
import verifyAuthToken from './auth.middleware';
import validation from './validation.middleware';
import validateUserId from './validateUserId.middleware';
import validateOrderId from './validateOrderId.middleware';
import validateProductId from './validateProductId.middleware';
import validateOrderCanEdit from './canEditOrder.middleware';
import validateCanDeleteProduct from './canDeleteProduct.middleware';

export default {
  NotFound: NotFound,
  ErrorHandler: ErrorHandler,
  verifyAuthToken: verifyAuthToken,
  validation: validation,
  validateUserId: validateUserId,
  validateOrderId: validateOrderId,
  validateProductId: validateProductId,
  validateOrderCanEdit: validateOrderCanEdit,
  validateCanDeleteProduct: validateCanDeleteProduct,
};
