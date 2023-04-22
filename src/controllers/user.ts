import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import { User } from '../models';

type RequestParams = {
  userId: string;
  userStatus: string;
};

type RequestBody = {
  firstName: string;
  secondName: string;
  surName: string;
  email: string;
  password: string;
  userPermission: string;
  userStatus: string;
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  try {
    const { email, userPermission } = body;
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      throw createHttpError(409, 'Пользователь с этим адресом электронной почты уже существует');
    }

    if (!userPermission) {
      throw createHttpError(409, 'Пожалуйста, укажите права пользователя');
    }
    const newUser = await User.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      throw createHttpError(404, 'Пользователь не найден');
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      throw createHttpError(409, 'Пользователь не найден');
    }
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    next(error);
  }
};

export const changeUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as RequestBody;
  const { userStatus } = body;

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      throw createHttpError(404, 'Пользователь не найден');
    }
    if (!userStatus) {
      throw createHttpError(422, 'Пожалуйста, укажите статус');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const changeUserPermission = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as RequestBody;
  const { userPermission } = body;

  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      throw createHttpError(404, 'Пользователь не найден');
    }
    if (!userPermission) {
      throw createHttpError(422, 'Пожалуйста, укажите право пользователь');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any).userData;
  try {
    const user = await User.findOne({ _id: new Types.ObjectId(userId) });
    if (!user) {
      throw createHttpError(401, 'Нет аутентифицированного пользователя');
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
