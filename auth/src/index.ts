import express from "express";
import 'express-async-errors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb://auth-mongo-srv:27017/auth' /*{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }*/
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000. v3');
  });
};

start();
