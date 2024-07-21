import request from 'supertest';
import express, { Express } from 'express';
import { UserController } from './UserController';
import { UserService } from '../services/UserService';

// Mock the UserService methods
jest.mock('../services/UserService', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return {
        createUser: jest.fn((name: string, email: string) => {}),
        getAllUsers: jest.fn(() => [
          { name: 'Alice', email: 'alice@example.com' },
          { name: 'Bob', email: 'bob@example.com' }
        ])
      };
    })
  };
});

describe('UserController', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    const userController = new UserController();
    app.post('/users', userController.createUser);
    app.get('/users', userController.getAllUsers);
  });

  it('Deve criar um usuário com sucesso', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Renata', email: 'renata@dio.com' });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'User created successfully' });
  });

  it('Deve falhar ao criar usuário quando o nome não é fornecido', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'renata@dio.com' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Bad request: name invalid' });
  });

  it('Deve retornar todos os usuários', async () => {
    const response = await request(app)
      .get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' }
    ]);
  });
});
