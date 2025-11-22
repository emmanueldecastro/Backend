    
import * as UserController from '../controllers/UserController.js';
import express from 'express';

const UserRoutes = express.Router();

UserRoutes.post('/register', UserController.RegisterUser);
UserRoutes.post('/login', UserController.LoginUser);


export default UserRoutes;
