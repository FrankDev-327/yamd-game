import { Socket, Server } from "socket.io";

const WEBSOCKET_CORS = {
    origin: "*",
}

export class Websocket {
    private static instance: Websocket;
    private static io: Server;

    private constructor(httpServer?) {
        Websocket.io = new Server(httpServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static initialize(httpServer?): Websocket {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket(httpServer);
        }
        return Websocket.instance;
    }

    public initializeHandlers(socketHandlers: Array<any>) {
        socketHandlers.forEach(element => {
            let namespace = Websocket.io.of(element.path, (socket: Socket) => {
                element.handler.handleConnection(socket);
            });

            if (element.handler.middlewareImplementation) {
                namespace.use(element.handler.middlewareImplementation);
            }
        });
    }
}