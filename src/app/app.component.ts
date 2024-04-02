import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { ChatServiceService } from './services/chat-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'AngularSocketsApp';
  constructor(
    public wsService: WebsocketService,
    public chatService:ChatServiceService
  ) { }

}


