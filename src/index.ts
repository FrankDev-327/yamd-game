require('dotenv').config();
import "reflect-metadata";
import * as express from 'express';
import { Application } from "express";
import * as morgan from "morgan";
import {Request, Response} from 'express';
import * as swaggerUi from "swagger-ui-express";
import { InitAppSource } from "./init-db/init.db";
import Router from './routes';
import { createServer } from "http";
import { Websocket } from "./socket/webscoket";
import { GameSocket } from "./socket/game.socket";

const PORT = process.env.PORT_SERVER || 8000;
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

const httpServer = createServer(app);
const io = Websocket.initialize(httpServer);

io.initializeHandlers([
  { path: '/game', handler: new GameSocket() }
]);

InitAppSource.databaseInit()
.then(() => {
  httpServer.listen(PORT, () => {
        console.log("Server is running on port", PORT);
    });
}).catch((err) => {
    console.log("Unable to connect to db", err);
    process.exit(1);
});

