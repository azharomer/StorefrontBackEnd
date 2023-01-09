type Order = {
  id?: number;
  status: boolean;
  user_id: number;
};

export type OrderDB = {
  id: number;
  status: string;
  user: string;
  product: string;
  product_id: number;
  category: string;
  price: number;
  quantity: number;
};

export default Order;
