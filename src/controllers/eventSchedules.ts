import { NextFunction, Request, Response } from 'express';
import { EventSchedule } from '../models/EventSchedule';
import { Company } from '../models';

export const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { userType, userId } = (req as any).userData;
  const body = req.body;

  let companyId;
  let company;

  try {
    if (userType === 'admin') {
      company = await Company.findOne({ admin: userId });

      companyId = company?._id;
    }
    const eventSchedules = await EventSchedule.create({ ...body, companyId: companyId });
    await company?.events.push((eventSchedules as any)._id);
    await company?.save();
    res.status(200).json(eventSchedules);
  } catch (error) {
    next(error);
  }
};

export const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;
  const body = req.body;
  try {
    const editedEvent = await EventSchedule.findByIdAndUpdate(eventId, { $set: body }, { new: true });
    res.status(200).json(editedEvent);
  } catch (error) {
    next(error);
  }
};

export const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  const { eventId } = req.params;

  try {
    await EventSchedule.findByIdAndDelete(eventId);
    res.status(200).json({ message: 'Time deleted' });
  } catch (error) {
    next(error);
  }
};
