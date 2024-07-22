import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    userService: UserService;

    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    createUser = (request: Request, response: Response): Response => {
        const User = request.body;

        if (!User.name || !User.email || !User.password) {
            return response.status(400).json({ message: 'Bad request! Todos os campos são obrigatórios' });
        }

     

        this.userService.createUser(User.name, User.email , User.password);
        return response.status(201).json({ message: 'Usuário criado' });
    }

    getUser = (request: Request, response: Response) => {
        return response.status(200)
    }

    // deleteUser = (request: Request, response: Response) => {
    //     const { email } = request.body;
    //     if (!email) {
    //         return response.status(400).json({ message: 'Bad request! E-mail obrigatório' });
    //     }

    //     const success = this.userService.deleteUser(email);
    //     if (success) {
    //         return response.status(200).json({ message: 'Usuário deletado' });
    //     } else {
    //         return response.status(404).json({ message: 'Usuário não encontrado' });
    //     }
    // }
}
