import express from 'express';
import { CurrentUser, LoginUser, LogoutUser, RegisterUser } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', LoginUser);

AuthRouter.post('/register', RegisterUser);

AuthRouter.post('/logout', LogoutUser);

AuthRouter.get('/me', protectedRoute, CurrentUser);

export default AuthRouter;
