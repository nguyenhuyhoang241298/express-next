import { Router } from 'express';
import { createUser } from '../controllers/users/createUsers';
import { deleteUserById } from '../controllers/users/deleteUsers';
import { getUserById, getUsers } from '../controllers/users/getUsers';
import { updateUserById } from '../controllers/users/updateUsers';
import { validateUserId } from '../middlewares/users/userId';
import { validateUserInfo } from '../middlewares/users/userInfo';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', validateUserId, getUserById);
userRouter.post('/', validateUserInfo, createUser);
userRouter.patch('/:id', validateUserId, validateUserInfo, updateUserById);
userRouter.delete('/:id', validateUserId, deleteUserById);

export default userRouter;
