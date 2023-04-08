import { Response, Request, NextFunction } from 'express';
import { Service } from '../models';

type RequestParams = {
  serviceId: string;
};

type RequestBody = {
  name: string;
  description: string;
  serviceAddress: string;
  order?: string;
  company?: string;
};

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const getService = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const serviceId = params.serviceId;

  try {
    const services = await Service.findOne({ _id: serviceId });
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, serviceAddress, description } = req.body as RequestBody;
    const newService = await Service.create({ name, serviceAddress, description });
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
};
