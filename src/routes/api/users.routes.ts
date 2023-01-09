import express, { Router } from 'express';
import {
  deleteUser,
  update,
  index,
  show,
} from '../../controllers/userController';
import middlewares from '../middlewares';
import validationRules from '../../utilities/validation/user/user.validation.rules';

const userRoutes: Router = express.Router();

// userRoutes.use(middlewares.verifyAuthToken);

userRoutes.route('/').get(index);
userRoutes
  .route('/:id')
  .get(middlewares.validateUserId, show)
  .patch(
    middlewares.validateUserId,
    middlewares.validation(validationRules.userValidation),
    update
  )
  .delete(middlewares.validateUserId, deleteUser);

export default userRoutes;
