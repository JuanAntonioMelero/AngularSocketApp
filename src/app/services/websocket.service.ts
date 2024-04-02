import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { io } from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus=false;
  private socket:any;
  constructor( ) {
    this.socket = io(environments.wsURL);
    this.checkStatus();
  }
  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus=true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus=false;
    });
   }
   emit( evento: string, payload?: any, callback?: Function ) {

    console.log('Emitiendo', evento);
    // emit('EVENTO', payload, callback?)
    this.socket.emit( evento, payload, callback );

  }

  listen( evento: string ) {
    return new Observable((Subscriber)=>{
      this.socket.on(evento, (data: any) =>{
        Subscriber.next(data)
      })
    })
  }
}
