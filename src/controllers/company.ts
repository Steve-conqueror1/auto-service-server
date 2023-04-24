import { NextFunction, Request, Response } from 'express';
import { Company } from '../models';
import createHttpError from 'http-errors';
import axios from 'axios';

type RequestParams = {
  companyId: string;
};

type ServiceRequestParams = {
  serviceId: string;
};

type RequestBody = {
  name: string;
  address: string;
  email: string;
  phone: string;
  contactPerson: string;
  services: string[];
};

const getLatitudes = async (address: string) => {
  const res = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.MAP_API_KEY}&limit=${1}&query=${address}`,
    { maxRedirects: 0 },
  );

  const resData = res.data;
  const { latitude, longitude } = (resData as any).data[0];
  return [latitude, longitude];
};

export const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const companyId = params.companyId;

  try {
    const company = await Company.findOne({ _id: companyId }).populate('services').populate('admin');
    if (!company) {
      throw createHttpError(404, 'Компания не найдена');
    }
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companies = await Company.find().populate('services').populate('admin');
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};

export const getCompanyByCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any).userData;
  try {
    const company = await Company.findOne({ admin: userId }).populate('services').populate('admin');
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

export const createCompany = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RequestBody;
  const { userId } = (req as any).userData;
  try {
    const [latitude, longitude] = await getLatitudes(body.address);
    const newCompany = await Company.create({ ...body, admin: userId, latitude, longitude });
    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all companies offering a certain service
 * */
export const findCompaniesByService = async (req: Request, res: Response, next: NextFunction) => {
  const { serviceId } = req.params as ServiceRequestParams;
  try {
    const companies = await Company.find({ services: { $eq: serviceId } });
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};

export const editCompany = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  try {
    const { companyId } = params;

    const updatedCompany = await Company.findByIdAndUpdate(companyId, { $set: body }, { new: true });
    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;

  try {
    const { companyId } = params;
    await Company.findByIdAndDelete(companyId);
    res.status(200).json({ message: 'Компания удалена' });
  } catch (error) {
    next(error);
  }
};
