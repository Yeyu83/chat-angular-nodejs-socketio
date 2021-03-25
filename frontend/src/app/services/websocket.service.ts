import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socketServerStatus$: BehaviorSubject<boolean>;

  constructor(
    private socket: Socket
  ) {
    this.socketServerStatus$ = new BehaviorSubject<boolean>(false);
    this.checkStatus();
  }

  public checkStatus(): void {
    this.socket.on('connect', () => {
      console.log('Connected!');
      this.socketServerStatus$.next(true);
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected!');
      this.socketServerStatus$.next(false);
    });
  }

  getSocketServerStatus(): Observable<boolean> {
    return this.socketServerStatus$;
  }

  emit(event: string, payload?: any, callback?: Function): void {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }
  
}
