import express, { Request, Response } from 'express';
import AuthRoutes from './api/auth.routes';
import OrdersRoute from './api/orders.routes';
import ProducsRoute from './api/products.routes';
import UsersRoute from './api/users.routes';
import middlewares from './middlewares';

const routes: express.Router = express.Router();

routes.use('/auth', AuthRoutes);
routes.use('/users', middlewares.verifyAuthToken, UsersRoute);
routes.use('/orders', middlewares.verifyAuthToken, OrdersRoute);
routes.use('/products', ProducsRoute);

routes.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'welcome to Store',
  });
});

routes.use(middlewares.ErrorHandler);

export default routes;
