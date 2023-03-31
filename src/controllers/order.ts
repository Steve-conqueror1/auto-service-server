import { Request, Response } from 'express';
import { Order } from '../models';

type RequestParams = {
  orderId: string;
};

type RequestBody = {
  description: string;
  services: string;
  status: string;
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('services');
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! что-то пошло не так' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params as RequestParams;
  try {
    const order = await Order.findOne({ _id: orderId });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Заказ не найден' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const body = req.body as RequestBody;

  try {
    const newOrder = await Order.create(body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(200).json({ message: 'Ошибка! Заказ не создан' });
  }
};

/**
 * Need to change order status
 * */
export const editOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params as RequestParams;
  const body = req.body as RequestBody;

  try {
    const editedOrder = await Order.findByIdAndUpdate(orderId, { $set: body }, { new: true });
    res.status(200).json(editedOrder);
  } catch (err) {
    res.status(200).json({ message: 'Ошибка! Заказ не отредактирован' });
  }
};
