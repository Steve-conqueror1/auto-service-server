import { NextFunction, Request, Response } from 'express';
import { Company, Order } from '../models';
import { notify } from '../helpers';
import createHttpError from 'http-errors';

type RequestParams = {
  orderId: string;
};

type RequestBody = {
  description: string;
  service: string;
  status: string;
  company: string;
  operatorComment: string;
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const { userType, userId } = (req as any).userData;
  const filters: { company?: string } = {};

  try {
    if (userType === 'admin') {
      const company = await Company.findOne({ admin: userId });

      filters['company'] = (company as any)._id;
    }

    const orders = await Order.find({ ...filters })
      .populate('service')
      .populate('createdBy')
      .populate('company');
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params as RequestParams;
  try {
    const order = await Order.findOne({ _id: orderId });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const { userId: createdBy } = (req as any).userData;
  const { company } = body;
  const { userType } = (req as any).userData;
  try {
    if (userType === 'admin') {
      throw createHttpError(401, 'У вас нет разрешения на создание заказа');
    }
    const newOrder = await Order.create({ ...body, createdBy });

    const requestedCompany = await Company.findById(company);
    const companyEmail = (requestedCompany as any).email;
    notify('newOrder', { email: companyEmail });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * Need to change order status
 * */
export const editOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params as RequestParams;
  const body = req.body as RequestBody;

  try {
    const editedOrder = await Order.findByIdAndUpdate(orderId, { $set: body }, { new: true });
    res.status(200).json(editedOrder);
  } catch (error) {
    next(error);
  }
};
