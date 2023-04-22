import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { User } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { notify } from '../helpers';

interface LoginBody {
  email: string;
  password: string;
}

type RequestBody = {
  firstName: string;
  secondName: string;
  surName: string;
  email: string;
  password: string;
  userPermission: string;
  userStatus: string;
};

type RequestParams = {
  userId: string;
  userStatus: string;
};

type PasswordChangeRequestBody = {
  password: string;
  repeatPassword: string;
};

type PasswordRestoreRequestBody = {
  email: string;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as LoginBody;

  const { email, password } = body;
  try {
    if (!email || !password) {
      throw createHttpError(400, 'Заполните все поля');
    }
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      throw createHttpError(401, 'Недействительные учетные данные');
    }

    if (user.userStatus === 'blocked') {
      throw createHttpError(403, 'Вы не авторизованы для входа, обратитесь к администратору');
    }

    const passwordMatch = await bcrypt.compare(password, user.password as string);
    if (!passwordMatch) {
      throw createHttpError(401, 'Недействительные учетные данные');
    }

    let token;

    try {
      token = jwt.sign({ userId: user._id, userType: user.userPermission }, `${process.env.SECRET}`, {
        expiresIn: '1h',
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json({ userId: user._id, email: user.email, token: token });
  } catch (error) {
    next(error);
  }
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as RequestBody;

  try {
    const existingUser = await User.findOne({ _id: new Types.ObjectId(userId) });

    const { firstName, secondName, password, surName } = body;
    if (!firstName || !secondName || !password || !surName) {
      throw createHttpError(422, 'Заполните все поля');
    }
    if (!existingUser) {
      throw createHttpError(404, 'Пользователь не найден');
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const editedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { ...body, password: passwordHashed } },
      { new: true },
    );

    if (!editedUser) {
      throw createHttpError(404, 'Пользователь не найден');
    }

    let token;

    try {
      token = jwt.sign({ userId: editedUser._id, userType: editedUser.userPermission }, `${process.env.SECRET}`, {
        expiresIn: '1h',
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json({ userId: editedUser._id, email: editedUser.email, token: token });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params as RequestParams;
  const body = req.body as PasswordChangeRequestBody;
  const { password, repeatPassword } = body;

  try {
    if (password !== repeatPassword) {
      throw createHttpError(400, 'Пароли должны совпадать');
    }

    const user = await User.findOne({ _id: new Types.ObjectId(userId) });

    if (!user || user.userStatus === 'blocked') {
      throw createHttpError(401, 'Ошибка - Связаться с администратором');
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    user.password = passwordHashed;
    user.save();
    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    next(error);
  }
};

export const restorePassword = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as PasswordRestoreRequestBody;
  const { email } = body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(401, 'Пользователь с таким E-mail не существует');
    }

    if (user.userStatus === 'blocked') {
      throw createHttpError(401, 'Ошибка - Связаться с администратором');
    }

    const userId = user._id;
    const useEmail = user.email as string;
    notify('restorePassword', { userId: userId, email: useEmail });

    res.status(200).json({ message: 'Ссылка для смены пароля была отправлена на вашу E-mail' });
  } catch (error) {
    next(error);
  }
};
