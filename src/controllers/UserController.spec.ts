import { UserController } from "./UserController";
import { UserService } from '../services/UserService'
import { Request, Response } from 'express'
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

const mockUserService = {

    createUser: jest.fn(),
    getUser: jest.fn(),
    deleteUser: jest.fn(),
    getUserById: jest.fn()

}

jest.mock('../services/UserService', () => {
    return{
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    
    
    const userController = new UserController();

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'thi',
                email: 'thi@test.com',
                password:'123',

            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado com sucesso.' });
    });

    it('Deve retornar erro quando o nome não é fornecido', () => {
        const mockRequest = {
            body: {
                email: 'thi@test.com',
                name:'',
                password:'123',

            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' });
    });

    it('Deve retornar erro quando o email não é fornecido', () => {
        const mockRequest = {
            body: {
                name: 'thi',
                email:'',
                password:'123',

            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' }); 
    });
    
    it('Deve retornar erro quando o password não é fornecido', () => {
        const mockRequest = {
            body: {
                name: 'thi',
                password:'',
                email:'thi@dio.com'
            }
        } as Request;
        const mockResponse = makeMockResponse();
        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios.' }); 
    });

 
    // it('Deve retornar o usuário pelo id', () => {
    //     const mockResponse = makeMockResponse();
    //     const mockRequest = makeMockRequest({
    //         params:{
    //             userId:'123456',
    //         }
    //     })
    //     userController.getUser(mockRequest, mockResponse)
    //     expect(mockUserService.getUser).toHaveBeenCalledWith('123456');
    //     expect(mockResponse.state.status).toBe(200);
    // })


  

   

    
});
