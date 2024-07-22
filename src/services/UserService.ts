import { UserRepository } from '../repositories/UserRepository';
import { AppDataSource } from "../database";
import { User } from "../entities/User";

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

    


    getUser = (id: string): Promise<User | null> => {
        return this.userRepository.getUser(id);
    }

    deleteUser = (id: string): Promise<boolean> => {
        return this.userRepository.deleteUser(id);
    }

    getAuthenticatedUser = async(email:string, password:string ): Promise<User | null> => {
        return this.userRepository.getUserByEmailAndPassword(email,password)

    }

    getToken = async (email:string , password:string) => {
        const user = await this.getAuthenticatedUser(email,password)

        return user?.id_user
    }
}
