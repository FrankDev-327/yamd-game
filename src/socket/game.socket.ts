import { Socket } from "socket.io";
import SocketInterface from "../interfaces/socket.interface";

export class GameSocket implements SocketInterface {
    handleConnection(socket: Socket): void {
        socket.emit('ping', 'Hi! I am a live socket connection');
        /* throw new Error("Method not implemented."); */
    }
    middlewareImplementation(socket: Socket, next: any): void {
        return next();
        /* throw new Error("Method not implemented."); */
    }

}