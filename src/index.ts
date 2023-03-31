import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { MongooseOptions } from 'mongoose';
import { companyRoutes, serviceRoutes } from './routes';

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

app.use('/api/companies', companyRoutes);
app.use('/api/services', serviceRoutes);

const PORT = process.env.PORT || 5001;

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
