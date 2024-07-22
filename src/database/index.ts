import { DataSource } from "typeorm"
import { User } from "../entities/User"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database:"./src/database/db.sqlite",
    entities: [
        User
    ],
    migrations: [
        "./src/database/migrations/*.ts",
    ],
   
})
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))


