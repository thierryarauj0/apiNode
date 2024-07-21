const db = [ 
    {
    name:"renata",
    email:"renata@dio.com",
    }
]

export class UserService{
    createUser = (name:string , email:string) => {
        const user = {
            name,
            email
        }
        db.push(user)
        console.log('Db atualizado' , db)

    }   
    getAllUsers = () => {
        return db
    }
    
}