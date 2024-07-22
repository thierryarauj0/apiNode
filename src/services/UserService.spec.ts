import {  UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database' , () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserSerivce', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser={

        id_user:'123456',
        name:'renata',
        email:'renata@dio.com',
        password:'123'
    }

    it('Deve adicionar um novo usuario' , async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve  (mockUser))
        const response = await userService.createUser('renata', 'renata@dio.com' , '123');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user:'123456',
            name:'renata',
            email:'renata@dio.com',
            password:'123'
        })
    })

    it('Devo retornar um usuario autenticado', async() => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation (() => Promise.resolve(mockUser))
        const token = await userService.getToken('renata@dio.com' , '123')
        expect(token).toBe('12345')
    })
})