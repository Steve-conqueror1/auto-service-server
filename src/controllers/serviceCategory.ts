import { NextFunction, Request, Response } from 'express';
import { ServiceCategory } from '../models/ServiceCategory';

export const getServiceCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const servicesCategories = await ServiceCategory.find();
    res.status(200).json(servicesCategories);
  } catch (error) {
    next(error);
  }
};
