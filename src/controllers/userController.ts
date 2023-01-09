import { Request, Response } from 'express';
import { UserModelStore } from '../models/user.model';
import Error from '../utilities/interfaces/error.interface';
import ApiResponse from '../utilities/interfaces/response.interface';
import User from '../utilities/types/user.type';

const userStore: UserModelStore = new UserModelStore();

// method get all users
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userStore.index();
    const result: ApiResponse = {
      success: true,
      msg: 'get all users successfully',
      data: users,
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

// method get user Info by Id
export const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const user: User = await userStore.show(id);
    const result: ApiResponse = {
      success: true,
      msg: 'get user successfully',
      data: user,
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

// method update user data
export const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      email: req.body.email,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const editUser: User = await userStore.update(user);
    const result: ApiResponse = {
      success: true,
      msg: 'update user successfully',
      data: editUser,
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

// method delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const user: User = await userStore.delete(id);
    const result: ApiResponse = {
      success: true,
      msg: 'Delete user successfully',
      data: user,
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
