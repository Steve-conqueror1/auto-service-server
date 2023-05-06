import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Company, Order, OrderResponse } from '../models';
import { notify } from '../helpers';

type RequestBody = {
  comment: String;
  status: String;
  sparePart: String;
  order: String;
};

export const createOrderResponse = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const { order } = body;
  const { userType } = (req as any).userData;
  try {
    if (userType !== 'admin') {
      throw createHttpError(401, 'У вас нет разрешения на создание заказа');
    }
    const newResponse = await OrderResponse.create(body);

    const respondingOrder = await Order.findById(order).populate('createdBy').populate('company');
    await respondingOrder?.responses.push(newResponse._id);
    await respondingOrder?.save();
    const orderCreator = (respondingOrder as any).createdBy;
    const orderCompany = (respondingOrder as any).company;
    const creatorEmail = orderCreator.email;
    notify('orderResponse', { email: creatorEmail, companyName: orderCompany.name });
    res.status(201).json(newResponse);
  } catch (error) {
    next(error);
  }
};
