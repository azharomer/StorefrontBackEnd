import Client from '../../config/database';
import User from '../../utilities/types/user.type';
import { PoolClient } from 'pg';
import { Auth } from '../../models/auth.model';
import { ProductStore } from '../../models/product.model';
import Product from '../../utilities/types/product.type';

const AuthStore: Auth = new Auth();

const ProductModel: ProductStore = new ProductStore();
describe('3- test Product Model', (): void => {
  describe('1- check defined methods in Product Model', (): void => {
    it('it should have index method to get all Products', () => {
      expect(ProductModel.index).toBeDefined();
    });
    it('it should have show method to get product data', () => {
      expect(ProductModel.show).toBeDefined();
    });
    it('it should have create method to Create  product data', () => {
      expect(ProductModel.create).toBeDefined();
    });
    it('it should have update method to update  product data', () => {
      expect(ProductModel.update).toBeDefined();
    });
    it('it should have delete method to delete product', () => {
      expect(ProductModel.delete).toBeDefined();
    });

    it('it should have search by category method to get all products matches search category ', () => {
      expect(ProductModel.getProductsByCategory).toBeDefined();
    });
  });

  describe('2- Test Product Model Logic', (): void => {
    const user: User = {
      username: 'azhar omer',
      firstname: 'azhar',
      lastname: 'omer',
      email: 'azharomer880@gmail.com',
      password: 'admin123',
    } as User;
    const product: Product = {
      name: 'test',
      category: 'a',
      price: 100,
    } as Product;

    beforeAll(async () => {
      const currentUser = await AuthStore.register(user);
      user.id = currentUser.id;
      const currentProduct = await ProductModel.create(product);
      product.id = currentProduct.id;
    });

    afterAll(async () => {
      const conn: PoolClient = await Client.connect();
      const sql: string = ` DELETE FROM users;
            ALTER  SEQUENCE users_id_seq RESTART WITH 1;
            DELETE FROM products;
            ALTER  SEQUENCE products_id_seq RESTART WITH 1;
           `;
      await conn.query(sql);
      conn.release();
    });

    it('create method return new product  in DB', async () => {
      const new_product: Product = await ProductModel.create({
        name: 'test',
        category: 'a',
        price: 100,
      } as Product);
      expect(new_product).toEqual({
        id: new_product.id,
        name: 'test',
        category: 'a',
        price: 100,
      } as Product);
    });

    it('index method return all avalible products in DB', async () => {
      const products: Product[] = await ProductModel.index();
      expect(products.length).toEqual(2);
    });

    it('show method return product info in DB', async () => {
      const productInfo: Product = await ProductModel.show(
        product.id as number
      );
      expect(productInfo).toEqual({
        id: product.id,
        name: 'test',
        category: 'a',
        price: 100,
      } as Product);
    });

    it('Delete method return product delete in DB', async () => {
      const productInfo: Product = await ProductModel.delete(
        product.id as number
      );
      expect(productInfo).toEqual({
        id: product.id,
        name: 'test',
        category: 'a',
        price: 100,
      } as Product);
    });

    it('search By Category method return products matches search category in DB', async () => {
      const products: Product[] = await ProductModel.getProductsByCategory(
        product.category
      );
      expect(products.length).toEqual(1);
    });
  });
});
