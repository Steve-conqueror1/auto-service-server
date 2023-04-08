import { Company, CompanyRequisites } from '../models';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import createHttpError from 'http-errors';

type RequestBody = {
  name: string;
  value: string;
};

type RequestParams = {
  requisiteId: string;
};

export const getCompanyRequisites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyRequisites = await CompanyRequisites.find();
    res.status(200).json(companyRequisites);
  } catch (error) {
    next(error);
  }
};

export const createCompanyRequisite = async (req: Request, res: Response, next: NextFunction) => {
  const { name, value } = req.body as RequestBody;
  const { companyId } = req.params;

  try {
    const existingInn = await CompanyRequisites.findOne({ name: 'ИНН', value });

    if (existingInn) {
      throw createHttpError(422, 'Организация с этой ИНН уже существует');
    }

    const companyRequisite = await CompanyRequisites.create({ name, value });
    const company = await Company.findById(companyId);
    company?.requisites.push(companyRequisite._id);
    company?.save();

    res.status(200).json(companyRequisite);
  } catch (error) {
    next(error);
  }
};

export const editCompanyRequisite = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;

  const { requisiteId } = params;

  try {
    const requisite = await CompanyRequisites.findOneAndUpdate(
      { _id: new Schema.Types.ObjectId(requisiteId) },
      { $set: body },
      { new: true },
    );
    res.status(200).json(requisite);
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyRequisite = async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params as RequestParams;
  const { requisiteId } = params;
  try {
    await CompanyRequisites.findByIdAndDelete(requisiteId);
    res.status(200).json({ message: 'Реквизит успешно удален' });
  } catch (error) {
    next(error);
  }
};
