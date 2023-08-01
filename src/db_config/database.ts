import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Scores } from "../entity/Scores";

const config =  new DataSource({
    type: "postgres",
    ssl: true,
    synchronize: true,
    url:'postgres://renteriafrancisco51:hDg6JCLd1Yqk@ep-falling-shape-790103.us-east-2.aws.neon.tech/yamp-game',
    entities: [User, Scores],
});

export default config;