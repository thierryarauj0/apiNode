import { UserService } from "./UserService";


describe('UserSerivce', () => {
    const userService = new UserService();

    it('Deve adicionar um novo usuario' , () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('renata', 'renata@dio.com');
        expect(mockConsole).toHaveBeenCalled()
    })
})