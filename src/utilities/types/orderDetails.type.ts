import { ProductDetails } from './product.type';

type OrderDetails = {
  id?: number;
  status: string;
  user: string;
  total_price: number;
  products: ProductDetails[];
};

export default OrderDetails;
