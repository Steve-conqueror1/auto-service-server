import { NextFunction, Request, Response } from 'express';
import { Order } from '../models';

type RequestParams = {
  orderId: string;
};

type RequestBody = {
  description: string;
  services: string;
  status: string;
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find().populate('services');
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

  try {
    const newOrder = await Order.create(body);
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
