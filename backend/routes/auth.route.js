import express from 'express';
import {
    editUser,
    getUserData,
    login,
    logout,
    register
} from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

authRouter.use(isAuth);
authRouter.post('/logout', logout);
authRouter.get('/getUserData', getUserData);
authRouter.patch('/edit', editUser);



export default authRouter;