import express, { Router } from 'express';
import { UserController } from './controllers/UserController';

export const router = Router();
const userController = new UserController();

router.post('/user', userController.createUser);
router.get('/user/:id', userController.getUserById);
router.delete('/user/:id', userController.deleteUser);
