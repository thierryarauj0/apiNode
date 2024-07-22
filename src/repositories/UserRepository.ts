import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager: EntityManager) {
        this.manager = manager;
    }

    createUser = async (user: User): Promise<User> => {
        return await this.manager.save(user);
    }

    getUser = async (userId: string): Promise<User | null> => {
        return await this.manager.findOne(User, { where: { id_user: userId } });
    }

    // updateUser = async (userId: string, updateData: Partial<User>): Promise<User> => {
    //     const user = await this.getUserById(userId);
    //     if (!user) throw new Error("User not found");

    //     Object.assign(user, updateData);

    //     return await this.manager.save(user);
    // }
}
