import { createServer } from "http";
import { Server } from "socket.io";
import Client from 'socket.io-client';

/* const SECONDS = 1000;
jest.setTimeout(70 * SECONDS); */

describe("my awesome project", () => {
    let io, serverSocket, clientSocket;
  
    beforeAll((done) => {
      const httpServer = createServer();
      io = new Server(httpServer);
      httpServer.listen(() => {
        const port = JSON.parse(JSON.stringify(httpServer.address())).port; 
        clientSocket = Client(`http://localhost:${port}`, {
            timeout: 5000, 
        });
        io.on("connection", (socket) => {
          serverSocket = socket;
        });
        clientSocket.on("connect", done);
      });
    }, 10000);
  
    afterAll((done) => {
      io.close(() => {
        clientSocket.close();
        done();
      });
    });
  
    test("should work", (done) => {
      clientSocket.on("hello", (arg) => {
        expect(arg).toBe("world");
        done();
      });
      serverSocket.emit("hello", "world");
    }, 5000); // Add a timeout value (in milliseconds) here
  
    test("should work (with ack)", (done) => {
      serverSocket.on("hi", (cb) => {
        cb("hola");
      });
      clientSocket.emit("hi", (arg) => {
        expect(arg).toBe("hola");
        done();
      });
    }, 5000); // Add a timeout value (in milliseconds) here
  });