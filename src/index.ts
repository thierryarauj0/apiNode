import express, {Request, Response} from 'express';
import { router } from './routes';
import 'reflect-metadata'
import { AppDataSource } from './database';

const db = {
    name:"renata",
    Email:"renata@dio.com",
}


const server = express();

AppDataSource.initialize()
    .then(() => {
      console.log('Datas Source initialized successfully')
    })
    .catch((error) => console.log(error))

server.use(express.json())
server.use(router)

server.get( '/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'Thi Bank Api is running!'});
})


server.listen(5000, () => console.log('server is running!'))