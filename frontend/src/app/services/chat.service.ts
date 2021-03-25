import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private _websocketService: WebsocketService
  ) { }

  sendMessage(message: string): void {
    const payload = { from: 'Paco', message };
    this._websocketService.emit('message', payload);
  }

  getMessages() {
    return this._websocketService.listen('newMessage');
  }

}
