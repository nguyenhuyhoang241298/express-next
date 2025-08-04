import { NextFunction, Request, Response } from 'express';

export const validateUserId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { id: userId } = request.params;

  if (!userId) {
    return response.status(400).json({
      message: `User id is required`,
      code: 'USER_ID_REQUIRED',
    });
  }

  const numericUserId = Number(userId);

  if (isNaN(numericUserId) || numericUserId < 0) {
    return response.status(400).json({
      message: 'Invalid user id',
      code: 'INVALID_USER_ID',
    });
  }

  next();
};
