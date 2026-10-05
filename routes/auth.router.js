import express from 'express';
import { CurrentUser, LoginUser, LogoutUser, RegisterUser } from '../controller/auth.controller.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginUser);

AuthRouter.post('/register', RegisterUser);

AuthRouter.post('/logout', LogoutUser);

AuthRouter.get('/me', CurrentUser);

export default AuthRouter;
