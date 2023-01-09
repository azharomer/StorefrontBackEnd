import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import app from '../config/app';
import { Auth } from '../models/auth.model';
import Error from '../utilities/interfaces/error.interface';
import ApiResponse from '../utilities/interfaces/response.interface';
import User from '../utilities/types/user.type';

const authModel: Auth = new Auth();

// method create new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      email: req.body.email,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };
    const newUser: User = await authModel.register(user);
    const token: string = jwt.sign(
      { id: newUser.id },
      app.token as unknown as string
    );
    const result: ApiResponse = {
      success: true,
      msg: 'create user successfully',
      data: { ...newUser, token },
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

// login method
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    let result: ApiResponse;
    const user: User | null = await authModel.auth(email, password);
    if (user) {
      const userToken = jwt.sign(
        { id: user.id },
        app.token as unknown as string
      );
      result = {
        success: true,
        msg: 'login successfully',
        data: { ...user, userToken },
      };
      res.status(200).json(result);
    } else {
      result = {
        success: false,
        msg: 'user email or password uncorrect try again',
      };
      res.status(401).json(result);
    }
  } catch (err) {
    const error: Error = err as Error;
    const result: ApiResponse = {
      success: false,
      msg: error.message as string,
    };
    const status: number = error.status ? (error.status as number) : 400;
    res.status(status).json(result);
  }
};
