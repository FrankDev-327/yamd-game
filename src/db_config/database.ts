import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Scores } from "../entity/Scores";
import { Tokens } from "../entity/tokens";

const config =  new DataSource({
    type: "postgres",
    ssl: true,
    synchronize: true,
    url: process.env.DB_URL,
    entities: [User, Scores, Tokens],
});

export default config;