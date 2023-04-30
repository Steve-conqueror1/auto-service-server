import { Response, Request, NextFunction } from 'express';
import { Company, Service, ServiceCategory, User } from '../models';

type RequestParams = {
  serviceId: string;
};

type RequestBody = {
  name: string;
  description: string;
  categoryId: string;
  order?: string;
  companyId: string;
  adminId: string;
};

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: adminId, userType } = (req as any).userData;
  const filters: { adminId?: string } = {};
  if (userType === 'admin') {
    filters['adminId'] = adminId;
  }
  try {
    const services = await Service.find({ ...filters });
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
    const { userId: adminId } = (req as any).userData;
    const { name, description, companyId, categoryId } = req.body as RequestBody;
    const newService = await Service.create({ name, description, companyId, categoryId, adminId });
    const company = await Company.findById(companyId);
    const category = await ServiceCategory.findById(categoryId);

    await company?.services.push(newService._id);
    await company?.save();

    await company?.services.push(newService._id);
    await company?.save();

    await category?.services.push(newService._id);
    await category?.save();
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
};
