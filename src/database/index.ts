import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "sqlite",
    database:"./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts",
    ],
   
})



