import express, {Request, Response} from 'express';
import { router } from './routes';

const db = {
    name:"renata",
    Email:"renata@dio.com",
}


const server = express();

server.use(express.json())
server.use(router)

server.get( '/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'Thi Bank Api is running!'});
})


server.listen(5000, () => console.log('server is running!'))