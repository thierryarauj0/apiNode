import { UserRepository } from '../repositories/UserRepository';
import { AppDataSource } from "../database";
import { User } from "../entities/User";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    createUser = (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password);
        return this.userRepository.createUser(user);
    }

    getUserById = (id: string): Promise<User | null> => {
        return this.userRepository.getUser(id);
    }

    deleteUser = (id: string): Promise<boolean> => {
        return this.userRepository.deleteUser(id);
    }
}
