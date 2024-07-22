import express, { Router } from 'express';
import { UserController } from './controllers/UserController';
import { LoginController } from './controllers/LoginController';

export const router = Router();
const userController = new UserController();
const loginController = new LoginController();

router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUserById);
router.delete('/user/:id', userController.deleteUser);

router.post('/login', loginController.login)