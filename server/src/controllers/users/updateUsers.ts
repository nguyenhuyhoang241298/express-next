import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../app';
import { usersTable } from '../../db/schema';

export const updateUserById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = request.params;
    const { name, age, email } = request.body;

    const updatedUsers = await db
      .update(usersTable)
      .set({
        name,
        age,
        email,
      })
      .where(eq(usersTable.id, Number(userId)))
      .returning();

    if (updatedUsers.length === 0) {
      return response.status(404).json({
        message: `User with id ${userId} not found`,
        code: 'USER_NOT_FOUND',
      });
    }

    return response.status(200).json(updatedUsers[0]);
  } catch (error: any) {
    console.log('error', error);

    if (error?.cause?.code === '23505') {
      return response.status(400).json({
        message: 'Email already exists',
        code: 'EMAIL_EXISTS',
      });
    }

    return next({
      message: 'Something went wrong',
      code: 'SERVER_ERROR',
      status: 500,
    });
  }
};
