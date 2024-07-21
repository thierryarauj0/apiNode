import express, {Request, Response} from 'express';

const server = express();

server.get( '/', (request: Request, response: Response) => {
    return response.status(200).json({message: 'Thi Bank Api is running!'});
})

server.listen(5000, () => console.log('server on'))