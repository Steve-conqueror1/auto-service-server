import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
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

type PasswordChangeRequestBody = {
  password: string;
  repeatPassword: string;
};

interface LoginBody {
  email: string;
  password: string;
}

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

    req.session.userId = editedUser?._id;
    req.session.userPermission = editedUser?.userPermission;

    res.status(200).json(editedUser);
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

    req.session.userId = user._id;
    req.session.userPermission = user.userPermission;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
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
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
