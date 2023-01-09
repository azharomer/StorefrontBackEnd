import { NextFunction, Request, Response } from 'express';
import { ProductStore } from '../../models/product.model';
import Product from '../../utilities/types/product.type';
import errorHandler from '../../utilities/services/api.service';

const validateProductId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const Product: ProductStore = new ProductStore();
    const found: Product | null = await Product.findProductById(parseInt(id));
    if (!found) {
      errorHandler(res, 'Product Not Found');
    } else {
      next();
    }
  } catch (err) {
    errorHandler(res, 'Product Not Found');
  }
};

export default validateProductId;
