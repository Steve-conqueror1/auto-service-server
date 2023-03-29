import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server connected at PORT ${PORT}`);
});
