import "reflect-metadata";
import * as express from 'express';
import { Application } from "express";
import * as morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import { InitAppSource } from "./init-db/init.db";
import Router from './routes';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));


app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
  
  app.use(Router);

  (async () => {
    await InitAppSource.databaseInit()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    }).catch((err) => {
        console.log("Unable to connect to db", err);
        process.exit(1);
      });
  });
  



/* import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
 */