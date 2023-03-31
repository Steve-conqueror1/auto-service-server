import { Response, Request } from 'express';
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

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const getService = async (req: Request, res: Response) => {
  const params = req.params as RequestParams;
  const serviceId = params.serviceId;

  try {
    const services = await Service.findOne({ _id: serviceId });
    res.status(200).json(services);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const { name, serviceAddress, description } = req.body as RequestBody;
    const newService = await Service.create({ name, serviceAddress, description });
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};
