import express from 'express';
import socketIO from "socket.io";
import http from 'http';

import { SERVER_PORT } from '../constants/environment';
import * as socket from '../socket/socket';


export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app); // tenemos que iniciar el socket server a través del http server
        this.io = new socketIO.Server(this.httpServer, { cors: { origin: "*", methods: ["GET", "POST"] } });
        this.setSocketListeners();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this());
    }

    public start(callback: any): void {
        this.httpServer.listen(this.port, callback);
    }

    private setSocketListeners(): void {
        this.io.on('connection', (client) => {
            console.log(`¡Cliente ${ client.id } conectado!`);
            socket.onMessage(client, this.io);
            socket.onDisconnect(client);
        });
    }

}