import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue([{ name: 'thi', email: 'thi@test.com' }]),
        deleteUser: jest.fn().mockReturnValue(true)
    }
    
    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'thi',
                email: 'thi@test.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' });
    });

    it('Deve retornar erro quando o nome não é fornecido', () => {
        const mockRequest = {
            body: {
                email: 'thi@test.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name obrigatório' });
    });

    it('Deve retornar erro quando o email não é fornecido', () => {
        const mockRequest = {
            body: {
                name: 'thi'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' }); 
    });
    

    it('Deve retornar todos os usuários', () => {
        const mockRequest = {} as Request;
        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toEqual([{ name: 'thi', email: 'thi@test.com' }]);
        expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });

    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            body: { email: 'thi@test.com' }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });

    it('Deve retornar erro quando o email não é fornecido', () => {
        const mockRequest = { body: {} } as Request;
        const mockResponse = makeMockResponse();
        userController.deleteUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! E-mail obrigatório' });
    });

  

   

    
});
