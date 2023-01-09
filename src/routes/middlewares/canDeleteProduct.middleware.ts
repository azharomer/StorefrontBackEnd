import { NextFunction, Request, Response } from 'express';
import errorHandler from '../../utilities/services/api.service';
import { ProductStore } from '../../models/product.model';

const validateCanDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { product_id } = req.params;
    const Product: ProductStore = new ProductStore();
    const found: boolean = await Product.checkCanDeleteProduct(
      parseInt(product_id)
    );

    !found
      ? errorHandler(
          res,
          'could not delete Product because it found in confirmed  Order '
        )
      : next();
  } catch (err) {
    errorHandler(
      res,
      'could not delete Product because it found in confirmed  Order'
    );
  }
};
export default validateCanDeleteProduct;
