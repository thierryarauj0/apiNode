import { User, UserService } from "./UserService";


describe('UserSerivce', () => {
    
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuario' , () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('renata', 'renata@dio.com');
        expect(mockConsole).toHaveBeenCalledWith('Db atualizado', mockDb)
    })
})