import { Socket } from "socket.io";
import SocketInterface from "../interfaces/socket.interface";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export class GameSocket implements SocketInterface {
    handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
        socket.emit('ping', 'Hi! I am a live socket connection');
        /* throw new Error("Method not implemented."); */
    }
    middlewareImplementation(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: any): void {
        return next();
        /* throw new Error("Method not implemented."); */
    }

}