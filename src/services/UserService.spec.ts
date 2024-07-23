import {  UserService } from "./UserService";
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database' , () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')


const mockUserRepository = require('../repositories/UserRepository')

describe('UserSerivce', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser={

        id_user:'123456',
        name:'renata',
        email:'renata@dio.com',
        password:'123456'
    }

    it('Deve adicionar um novo usuario' , async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve  (mockUser))
        const response = await userService.createUser('renata', 'renata@dio.com' , '123');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user:'123456',
            name:'renata',
            email:'renata@dio.com',
            password:'123456'
        })
    })

    it('Devo retornar um token de usuario autenticado', async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation (() => Promise.resolve(mockUser))
        jest.spyOn(jwt,'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('renata@dio.com' , '123456')
        expect(token).toBe('token')
    })

    it('deve retornar um erro caso nao encontre um usuario', async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@dio.com' , '123456)')).rejects.toThrow(new Error('Invalid email or password'))
    })

    
})