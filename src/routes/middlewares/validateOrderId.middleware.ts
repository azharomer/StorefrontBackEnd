import { NextFunction, Request, Response } from 'express';
import { OrderStore } from '../../models/order.model';
import Order from '../../utilities/types/order.type';
import errorHandler from '../../utilities/services/api.service';

const validateOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const Order: OrderStore = new OrderStore();
    const found: Order | null = await Order.findOrderById(
      parseInt(user_id),
      parseInt(id)
    );
    if (!found) {
      errorHandler(res, 'Order Not Found');
    } else {
      next();
    }
  } catch (err) {
    errorHandler(res, 'Order Not Found');
  }
};

export default validateOrderId;
