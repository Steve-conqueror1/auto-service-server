import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw createHttpError(401, 'Ошибка аутентификации');
    }
    const decodedToken = jwt.verify(token, `${process.env.SECRET}`);
    (req as any).userData = { userId: (decodedToken as any).userId, userType: (decodedToken as any).userType };
    next();
  } catch (error) {
    return next(error);
  }
};
