type Product = {
  id?: number;
  name: string;
  category: string;
  price: number;
};

export type ProductDetails = Product & {
  quantity: number;
};

export default Product;
