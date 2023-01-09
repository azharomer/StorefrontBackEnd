import express, { Router } from 'express';
import { register, login } from '../../controllers/authController';
import validationRules from '../../utilities/validation/auth/auth.validation.rules';
import middlewares from '../middlewares';

const authRoutes: Router = express.Router();

authRoutes
  .route('/register')
  .post(middlewares.validation(validationRules.RegisterRules), register);

authRoutes
  .route('/login')
  .post(middlewares.validation(validationRules.loginRules), login);

export default authRoutes;
