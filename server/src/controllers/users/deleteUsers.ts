import { eq } from 'drizzle-orm';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../app';
import { usersTable } from '../../db/schema';

export const deleteUserById = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { id: userId } = request.params;

    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.id, Number(userId)))
      .returning();

    if (deletedUser.length === 0) {
      return response.status(404).json({
        message: `User with id ${userId} not found`,
        code: 'USER_NOT_FOUND',
      });
    }

    response.status(200).json(deletedUser);
  } catch (error: any) {
    if (error?.cause?.code === '23503') {
      return response.status(409).json({
        message: 'Cannot delete user due to existing references',
        code: 'FOREIGN_KEY_CONSTRAINT',
      });
    }

    return next({
      status: 500,
      code: 'DELETE_USER_ERROR',
      message: 'An error occur when delete user by id',
    });
  }
};
