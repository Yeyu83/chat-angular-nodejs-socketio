import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const onDisconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log(`${ client.id } disconnected!`);
    });
};

export const onMessage = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload) => { // desde el frontal se emite un evento 'message' que el backend escucha
        io.emit('newMessage', payload); // y viceversa, desde el backend se emite un evento newMessage que el frontal escucha
    });
};