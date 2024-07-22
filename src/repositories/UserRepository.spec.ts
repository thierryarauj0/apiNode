import { UserRepository } from './UserRepository';
import { User } from '../entities/User';
import { EntityManager } from 'typeorm';

// Mock do EntityManager
const getMockEntityManager = jest.fn();

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser: User = {
        id_user: '1',
        name: 'Thierry',
        email: 'thierry@test.com',
        password: 'senha123',
    };


    beforeEach(() => {
        managerMock = {
            save: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
            delete: jest.fn().mockResolvedValue({ affected: 1 })
        };
        userRepository = new UserRepository(managerMock as EntityManager);
    });

    it('should create a user successfully', async () => {
        const response = await userRepository.createUser(mockUser);
        expect(managerMock.save).toHaveBeenCalled();
        expect(managerMock.save).toHaveBeenCalledWith(mockUser);
        expect(response).toEqual(mockUser);
    });

    // it('should retrieve a user by email', async () => {
    //     const user = await userRepository.getUser(mockUser.email);
    //     expect(managerMock.findOne).toHaveBeenCalled();
    //     expect(managerMock.findOne).toHaveBeenCalledWith(User, { where: { email: mockUser.email } });
    //     expect(user).toEqual(mockUser);
    // });

    // it('should delete a user successfully', async () => {
    //     const response = await userRepository.deleteUser(mockUser.email);
    //     expect(managerMock.delete).toHaveBeenCalled();
    //     expect(managerMock.delete).toHaveBeenCalledWith(User, { email: mockUser.email });
    //     expect(response).toBe(true);
    // });

   
});
