import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response): Response => {
        const user = request.body;

        if (!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: 'Bad request! Todos os campos são obrigatórios.' });
        }

        this.userService.createUser(user.name, user.email, user.password);
        return response.status(201).json({ message: 'Usuário criado com sucesso.' });
    }

    getUserById = async (request: Request, response: Response) => {
        const { id } = request.params;

        const user = await this.userService.getUserById(id);
        if (user) {
            return response.status(200).json(user);
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado.' });
        }
    }

    deleteUser = async (request: Request, response: Response) => {
        const { id } = request.params;

        const success = await this.userService.deleteUser(id);
        if (success) {
            return response.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado.' });
        }
    }
}
