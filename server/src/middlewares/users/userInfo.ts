import { NextFunction, Request, Response } from 'express';
import { emailRegex } from '../../config/regex';

export const validateUserInfo = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { name, age, email } = request.body;

  if (!name) {
    return response
      .status(400)
      .json({ message: 'Name is required field', code: 'NAME_REQUIRED' });
  }

  if (!email) {
    return response
      .status(400)
      .json({ message: 'Email is required field', code: 'EMAIL_REQUIRED' });
  }

  if (!emailRegex.test(email)) {
    return response.status(400).json({
      message: 'Invalid email',
      code: 'INVALID_EMAIL',
    });
  }

  if (
    (typeof age !== 'number' || age <= 0) &&
    age !== undefined &&
    age !== null
  ) {
    return response.status(400).json({
      message: 'Invalid age',
      code: 'INVALID_AGE',
    });
  }

  next();
};
