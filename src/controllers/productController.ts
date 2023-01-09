import { Request, Response } from 'express';
import { ProductStore } from '../models/product.model';
import Error from '../utilities/interfaces/error.interface';
import ApiResponse from '../utilities/interfaces/response.interface';
import Product from '../utilities/types/product.type';

const Product: ProductStore = new ProductStore();
// method get all Product
export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const Products: Product[] = await Product.index();
    const result: ApiResponse = {
      success: true,
      msg: 'get all Products successfully',
      data: Products,
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

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const newProduct: Product = await Product.create(product);
    const result: ApiResponse = {
      success: true,
      msg: 'create Product successfully',
      data: newProduct,
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

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const newProduct: Product = await Product.update(product);
    const result: ApiResponse = {
      success: true,
      msg: 'Update Product successfully',
      data: newProduct,
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

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product_id: number = parseInt(req.params.id);

    const product: Product = await Product.show(product_id);
    const result: ApiResponse = {
      success: true,
      msg: 'get  Product successfully',
      data: product,
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

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category: string = req.params.category;
    const products: Product[] = await Product.getProductsByCategory(category);
    const result: ApiResponse = {
      success: true,
      msg: 'get all  Products by category successfully',
      data: products,
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

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product_id: number = parseInt(req.params.id);

    const product: Product = await Product.delete(product_id);
    const result: ApiResponse = {
      success: true,
      msg: 'Delete  Product successfully',
      data: product,
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

export const popularProduct = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const Products: Product[] = await Product.getpopularProduct();
    const result: ApiResponse = {
      success: true,
      msg: 'get top  popular Products successfully',
      data: Products,
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
