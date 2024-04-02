import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatServiceService } from '../../services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription! : Subscription;
  elemento!: HTMLElement  ;

  mensajes: any[] = [];



  constructor(
    public chatService: ChatServiceService
  ) { }

  ngOnInit() {

    this.elemento = document.getElementById('chat-mensajes') !;

    this.mensajesSubscription = this.chatService.getMessages().subscribe(
      (      msg: any) => {

      this.mensajes.push( msg );

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);

    });

  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }


  enviar() {

    if ( this.texto.trim().length === 0 ) {
      return;
    }
    console.log(this.texto);
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
