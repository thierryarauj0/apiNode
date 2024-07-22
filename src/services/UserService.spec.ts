import {  UserService } from "./UserService";

jest.mock('../repositories/UserRepository')
jest.mock('../database' , () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/UserRepository')

describe('UserSerivce', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuario' , async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve ({
            id_user:'123456',
            name:'renata',
            email:'renata@dio.com',
            password:'1234'
        }))
        const response = await userService.createUser('renata', 'renata@dio.com' , '123');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user:'123456',
            name:'renata',
            email:'renata@dio.com',
            password:'1234'
        })
    })
})