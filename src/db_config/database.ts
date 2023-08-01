require('dotenv').config({path: '../../.env'});

import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Scores } from "../entity/Scores";

const config =  new DataSource({
    type: "postgres",
    ssl: true,
    synchronize: true,
    url: process.env.DB_URL,
    entities: [User, Scores],
});

export default config;