import { Request, Response } from 'express';
import { Company } from '../models';

type RequestParams = {
  companyId: string;
};

export const getCompany = async (req: Request, res: Response) => {
  const params = req.params as RequestParams;
  const companyId = params.companyId;

  try {
    const company = await Company.find({ _id: companyId }).populate('services');
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
