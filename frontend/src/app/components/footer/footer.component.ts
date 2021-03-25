import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public socketServerStatus: string = '';

  constructor(
    private _websocketService: WebsocketService
  ) { }

  ngOnInit() {
    this._websocketService.getSocketServerStatus().subscribe((status: boolean) => {
      this.socketServerStatus = status ? 'Conectado' : 'Desconectado';
    });
  }

}
