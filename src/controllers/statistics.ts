import { NextFunction, Request, Response } from 'express';
import { Company, User, Order } from '../models';

export const getStatistics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await Company.find().countDocuments();
    const users = await User.find().countDocuments();
    const orders = await Order.find().countDocuments();
    res.status(200).json({ companies, users, orders });
  } catch (error) {
    next(error);
  }
};
