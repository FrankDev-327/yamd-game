import "reflect-metadata";
import * as express from 'express';
import { Application } from "express";
import * as morgan from "morgan";
import {Request, Response} from 'express';
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

app.get( "/test", (req: Request, res: Response ) => {
    res.send( "Hello world!" );
});

InitAppSource.databaseInit()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});
