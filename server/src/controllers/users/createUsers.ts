import { NextFunction, Request, Response } from 'express';
import { db } from '../../app';
import { usersTable } from '../../db/schema';

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, age, email } = request.body;

    const users = await db
      .insert(usersTable)
      .values({ name, age, email })
      .returning();

    if (!users[0]) {
      return response.status(500).json({
        message: 'Something went wrong when create new user',
        code: 'SERVER_ERROR',
      });
    }

    response.status(201).json(users[0]);
  } catch (error: any) {
    console.log('error', error);

    if (error?.cause?.code !== '23505') {
      return next({
        message: 'Something went wrong',
        code: 'SERVER_ERROR',
        status: 500,
      });
    }

    const constraintName = error?.cause?.constraint || '';
    if (constraintName.includes('email')) {
      return response.status(400).json({
        message: 'Email already exists',
        code: 'EMAIL_EXISTS',
      });
    }

    const detail = error.detail || '';
    if (detail.includes('Key (email)')) {
      return response.status(400).json({
        message: 'Email already exists',
        code: 'EMAIL_EXISTS',
      });
    }

    return response.status(400).json({
      message: 'Duplicate value detected',
      code: 'DUPLICATE_VALUE',
    });
  }
};
