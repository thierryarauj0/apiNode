import express, {Request, Response} from 'express';
import { UserController } from './controllers/UserController';

const db = {
    name:"renata",
    Email:"renata@dio.com",
}

const userController = new UserController()

const server = express();

server.use(express.json())

server.get( '/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'Thi Bank Api is running!'});
})

server.post('/user'  , userController.createUser)


server.listen(5000, () => console.log('server is running!'))