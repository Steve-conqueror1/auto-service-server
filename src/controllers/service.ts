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
  available: boolean;
};

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: adminId, userType } = (req as any).userData;
  const { companyId, categoryId } = req.query;
  const filters: { adminId?: string; companyId?: string; categoryId?: string } = {};
  if (userType === 'admin') {
    filters['adminId'] = adminId;
  }

  if (companyId) {
    filters['companyId'] = companyId as string;
  }

  if (categoryId) {
    filters['categoryId'] = categoryId as string;
  }

  try {
    const services = await Service.find({ ...filters }).populate('categoryId');
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

export const editService = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const { serviceId } = params;
  const body = req.body as RequestBody;

  try {
    const editedService = await Service.findByIdAndUpdate(serviceId, { $set: body }, { new: true });

    res.status(200).json(editedService);
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId: adminId } = (req as any).userData;
    const { name, description, companyId, categoryId, available } = req.body as RequestBody;
    const newService = await Service.create({ name, description, companyId, categoryId, adminId, available });
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
