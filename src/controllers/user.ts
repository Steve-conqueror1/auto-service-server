import { Request, Response } from 'express';
import { User } from '../models';

type RequestParams = {
  userId: string;
};

type RequestBody = {
  firstName: string;
  secondName: string;
  surName: string;
  email: string;
  password: string;
  userType: string;
  userStatus: string;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const body = req.body as RequestBody;
  try {
    const newUser = await User.create(body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params as RequestParams;

  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as RequestBody;

  try {
    const editedUser = await User.findByIdAndUpdate(userId, { $set: body }, { new: true });
    res.status(200).json(editedUser);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params as RequestParams;

  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Пользователь успешно удален' });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};
