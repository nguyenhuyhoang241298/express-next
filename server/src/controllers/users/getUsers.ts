import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../app';
import { usersTable } from '../../db/schema';

export const getUsers = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const users = await db.select().from(usersTable);
    response.json(users);
  } catch (error) {
    next({
      status: 404,
      message: 'Not found',
    });
  }
};

export const getUserById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = request.params;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(userId)))
      .limit(1);

    if (!user[0]) {
      return response.status(404).json({
        message: `User with id ${userId} can not be found`,
        code: 'GET_USER_BY_ID_NOT_FOUND',
      });
    }

    response.status(200).json(user[0]);
  } catch (error) {
    return next({
      status: 500,
      message: 'An error occur when get user by id',
      code: 'GET_USER_BY_ID_ERROR',
    });
  }
};
