import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password was not provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //Fetch user from DB
    const existingUser = await User.findOne({ email });
    console.log('Existing user:', existingUser);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials 1');
    }

    //Compare passwords
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials 2');
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // Store JWT on session object
    req.session = {
      jwt: userJwt,
    };

    console.log('Sign in successfull');

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
