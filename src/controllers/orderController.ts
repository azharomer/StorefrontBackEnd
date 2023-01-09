import { Request, Response } from 'express';
import { OrderStore } from '../models/order.model';
import Error from '../utilities/interfaces/error.interface';
import ApiResponse from '../utilities/interfaces/response.interface';
import Order from '../utilities/types/order.type';
import OrderDetails from '../utilities/types/orderDetails.type';
import OrderProduct from '../utilities/types/orderProducts.type';

const Order: OrderStore = new OrderStore();

// method get all Orders
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const orders: OrderDetails[] = await Order.index(user_id);
    const result: ApiResponse = {
      success: true,
      msg: 'get all orders successfully',
      data: orders,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

export const completed = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const orders: OrderDetails[] = await Order.completed(user_id);
    const result: ApiResponse = {
      success: true,
      msg: 'get all completed orders successfully',
      data: orders,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

export const current = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const order: OrderDetails = await Order.currentOrder(user_id);
    const result: ApiResponse = {
      success: true,
      msg: 'get current order successfully',
      data: order,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};
// method get  Order details
export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const order_id: number = parseInt(req.params.id);
    const order: OrderDetails = await Order.show(user_id, order_id);
    const result: ApiResponse = {
      success: true,
      msg: 'get order details successfully',
      data: order,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

// method create  Order  with products list
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const products: OrderProduct[] = req.body.products?.map(
      (product: OrderProduct) => {
        return {
          product_id: product.product_id,
          quantity: product.quantity,
        } as OrderProduct;
      }
    );

    const newOrder: Order = await Order.create(user_id, products);
    const result: ApiResponse = {
      success: true,
      msg: 'create Order successfully',
      data: newOrder,
    };

    res.status(200).json(result);
  } catch (err: unknown) {
    console.log(err);
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const order_id: number = parseInt(req.params.id);
    const order: Order = await Order.delete(order_id, user_id);
    const result: ApiResponse = {
      success: true,
      msg: 'Delete order successfully',
      data: order,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product: OrderProduct = {
      order_id: parseInt(req.params.id),
      product_id: parseInt(req.body.product_id),
      quantity: parseInt(req.body.quantity),
    };
    const newProduct: OrderProduct = await Order.addProduct(product);
    const result: ApiResponse = {
      success: true,
      msg: 'add product to current order successfully',
      data: newProduct,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    console.log(err);
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};

export const confirmOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id: number = parseInt(req.body.user_id);
    const order_id: number = parseInt(req.params.id);
    const order: OrderDetails = await Order.confirmOrder(user_id, order_id);

    const result: ApiResponse = {
      success: true,
      msg: 'Confirme order data successfully',
      data: order,
    };
    res.status(200).json(result);
  } catch (err: unknown) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};
