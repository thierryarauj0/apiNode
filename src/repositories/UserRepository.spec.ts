import { EntityManager } from "typeorm"
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock"
import { UserRepository } from "./UserRepository"
import { User } from "../entities/User"

describe('UserRepository', () => {
    let userRepository : UserRepository
    let managerMock : Partial<EntityManager>

    const mockUser : User = {
        user_id: '1',
        name: 'thi',
        email: 'thi@test.com',
        password: 'senha123',
    }

    beforeAll(async () => {
        
         managerMock = await getMockEntityManager({  })
        userRepository = new UserRepository(managerMock as EntityManager)
    })
    
    it('should create user', async () => {
       await userRepository.createUser(mockUser)
       expect(managerMock.save).toHaveBeenCalled()
        
    })
})