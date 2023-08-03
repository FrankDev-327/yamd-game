import { Socket } from "socket.io";
import { create } from "../services/score.service";
import SocketInterface from "../interfaces/socket.interface";

export class GameSocket implements SocketInterface {
    handleConnection(socket: Socket): void {
        socket.emit('ping', 'Hi! I am a live socket connection');

        socket.on('set-scores', async (data) => {
            const scoreData = await create(data);
            socket.emit('scores', scoreData);
        });
    }

    middlewareImplementation(socket: Socket, next: any): void {        
        return next();
    }

}