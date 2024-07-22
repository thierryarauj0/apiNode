import { LoginController } from './LoginController';
import { UserService } from '../services/UserService';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { IsNull } from 'typeorm';

describe('LoginController', () => {
  let loginController: LoginController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    loginController = new LoginController(userService);
  });

  test('should return a token with correct format and structure', async () => {
    // Mock the UserService.getToken method to return a valid token
    jest.spyOn(userService, 'getToken').mockResolvedValue('mockToken');

    const request: Request = {
      body: {
        email: 'test@example.com',
        password: 'test123',
      },
    } as any;

    const response: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await loginController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ token: 'mockToken' });
  });

  test('should return 500 status code when UserService.getToken throws an error', async () => {
    // Mock the UserService.getToken method to throw an error
    jest.spyOn(userService, 'getToken').mockRejectedValue(new Error('Invalid email or password'));

    const request: Request = {
      body: {
        email: 'test@example.com',
        password: 'test123',
      },
    } as any;

    const response: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await loginController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'Email/Password invalidos' });
  });

  test('should return 500 status code when request body is missing email or password', async () => {
    const request: Request = {
      body: {},
    } as any;

    const response: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await loginController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'Email/Password invalidos' });
  });

  test('should return 500 status code when UserService.getToken returns an empty string', async () => {
    // Mock the UserService.getToken method to return an empty string
    jest.spyOn(userService, 'getToken').mockResolvedValue('');

    const request: Request = {
      body: {
        email: 'test@example.com',
        password: 'test123',
      },
    } as any;

    const response: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await loginController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'token vazio' });
  });

  test('should return 500 status code when UserService.getToken returns null', async () => {
    jest.spyOn(userService, 'getToken').mockResolvedValue('');

    const request: Request = {
      body: {
        email: 'test@example.com',
        password: 'test123',
      },
    } as any;

    const response: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await loginController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ message: 'token vazio' });
  });
});