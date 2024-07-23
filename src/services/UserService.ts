import { UserRepository } from '../repositories/UserRepository';
import { AppDataSource } from "../database";
import { User } from "../entities/User";
import { sign } from 'jsonwebtoken';

export class UserService {
    getUserById(id: string) {
        throw new Error('Method not implemented.');
    }
    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    createUser = (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }

    


    getUser = async (userId: string): Promise<User | null> => {
        return this.userRepository.getUser(userId);
    }

    deleteUser = (id: string): Promise<boolean> => {
        return this.userRepository.deleteUser(id);
    }

    getAuthenticatedUser = async(email:string, password:string ): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email,password)

    }

    getToken = async (email:string , password:string): Promise<string> => {
        const user = await this.getAuthenticatedUser(email,password)

        if (!user) {
            throw new Error('Invalid email or password')
        }

        const tokenData = {
            name: user?.name,
            email: user?.email,
            id: user?.id_user
        }
    const tokenKey = '123456789'

    const tokenOptions = {
        subject: user?.id_user,
    }

    const token = sign(tokenData, tokenKey, tokenOptions)

    return token
    }
}
