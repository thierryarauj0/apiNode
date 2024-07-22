import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private manager: EntityManager;

    constructor(manager: EntityManager) {
        this.manager = manager;
    }

    createUser = async (user: User): Promise<User> => {
        return await this.manager.save(user);
    }

    getUser = async (id: string): Promise<User | null> => {
        return await this.manager.findOne(User, { where: { id_user: id } });
    }

    deleteUser = async (id: string): Promise<boolean> => {
        const result = await this.manager.delete(User, { id_user: id });
        if (result.affected && result.affected > 0) {
            return true;
        } else {
            return false;
        }
    }
}
