import { Request, Response } from 'express';
import { Company } from '../models';

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

export const getCompany = async (req: Request, res: Response) => {
  const params = req.params as RequestParams;
  const companyId = params.companyId;

  try {
    const company = await Company.findOne({ _id: companyId }).populate('services');
    res.status(200).json(company);
  } catch (err) {
    res.status(401).json({ message: 'Компания не найдена' });
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().populate('services');
    res.status(200).json(companies);
  } catch (err) {
    res.status(401).json({ message: 'Ошибка! Что-то пошло не так' });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  const { name, address, contactPerson, phone, email, services } = req.body as RequestBody;
  try {
    const newCompany = await Company.create({ name, address, contactPerson, phone, email, services });
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Компания не создана' });
  }
};

/**
 * Get all companies offering a certain service
 * */
export const findCompaniesByService = async (req: Request, res: Response) => {
  const { serviceId } = req.params as ServiceRequestParams;
  try {
    const companies = await Company.find({ services: { $eq: serviceId } });
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Компания не найдена' });
  }
};

export const editCompany = async (req: Request, res: Response) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  try {
    const { companyId } = params;

    const updatedCompany = await Company.findByIdAndUpdate(companyId, { $set: body }, { new: true });
    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Компания не редактировано' });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  const params = req.params as RequestParams;

  try {
    const { companyId } = params;
    await Company.findByIdAndDelete(companyId);
    res.status(200).json({ message: 'Компания удалена' });
  } catch (err) {
    res.status(400).json({ message: 'Ошибка! Компания не удалена' });
  }
};
