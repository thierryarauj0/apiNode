import { UserRepository } from './UserRepository';
import { User } from '../entities/User';
import { getMockEntityManager } from '../__mocks__/mockEntityManager.mock';
import { EntityManager } from 'typeorm';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let managerMock: Partial<EntityManager>;

    const mockUser: User = {
        id_user: '1',
        name: 'thi',
        email: 'thi@test.com',
        password: 'senha123',
    };

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            safeReturn: mockUser
        });
        userRepository = new UserRepository(managerMock as EntityManager);
    });

    it('should create user', async () => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled()
        expect(response).toMatchObject(mockUser)
         
     })

    it('should retrieve user by id', async () => {
        managerMock.findOne = jest.fn().mockResolvedValue(mockUser);
        const user = await userRepository.getUser('1');
        expect(managerMock.findOne).toHaveBeenCalledWith(User, { where: { user_id: '1' } });
        expect(user).toEqual(mockUser);
    });

    // it('should update user information', async () => {
    //     const updateData = { name: 'newName' };
    //     managerMock.findOne = jest.fn().mockResolvedValue(mockUser);
    //     managerMock.save = jest.fn().mockResolvedValue({...mockUser, ...updateData});

    //     const updatedUser = await userRepository.updateUser('1', updateData);
    //     expect(managerMock.save).toHaveBeenCalledWith({...mockUser, ...updateData});
    //     expect(updatedUser.name).toEqual('newName');
    // });
});

