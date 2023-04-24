import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { MongooseOptions } from 'mongoose';
import { companyRoutes, serviceRoutes, orderRoutes, userRoutes, serviceCategories, authRoutes } from './routes';
import createHttpError, { isHttpError } from 'http-errors';
import { checkAuth } from './middleware/checkAuth';

const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

app.use(checkAuth);

app.use('/api/companies', companyRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/serviceCategories', serviceCategories);

app.use((req, res, next) => {
  next(createHttpError(404, '404 - endpoint не существует'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'Что-то пошло не так!';
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }

  return res.status(statusCode).json({
    message: errorMessage,
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as MongooseOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected at PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
