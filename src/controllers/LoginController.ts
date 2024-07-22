import {Request , Response} from 'express'
import {sign} from 'jsonwebtoken'




export class LoginController{

    login = async (request:Request , response:Response ) => {
        const tokenData = {
            name: user.name,
            email: user.email
        }

        const tokenKey='12345'

        const tokenOptions = {
            subject: user.id_user,
            expiresIn:'4h'
        } 

        const token = sign(tokenData, tokenKey, tokenOptions)
        return response.status(200).json({token})
    }

}