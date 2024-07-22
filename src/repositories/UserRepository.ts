import { EntityManager } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/User";
export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager = AppDataSource.manager ) {
        this.manager = manager;
    }   

    createUser = async (user: User) => {
        await this.manager.save(user);
    }
}