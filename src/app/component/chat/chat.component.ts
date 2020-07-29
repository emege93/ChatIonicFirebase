import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { message } from '../../models/message';
import { ChatsService } from '../../service/chats.service';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any;

  public mensajes =[];
  //public message: message;
  public room: any;
  public msg: string;

  public email: string;

  constructor( 
    private navparams : NavParams, 
    private modal : ModalController,
    private chatService : ChatsService,
    private AFauth : AngularFireAuth) { 

      this.AFauth.onAuthStateChanged(function(usere) {
        if (usere) {
          console.log('usuario activo')
          const email = usere.email;
        } else {
          console.log('usuario no activo')
  
        }
      })

      this.AFauth.onAuthStateChanged( usere => {
        let correo = usere.email;
        this.email = correo;
      })
     }
     

  ngOnInit() {

    this.chatService.getChatRoom(this.chat.id).subscribe( room => {
      console.log(room);
      this.room = room;
    })

    this.chat = this.navparams.get('chat')
  }
  
  closeChat() {
    this.modal.dismiss()
  }

  sendMessage() {


    
    const mensaje: message = {
      content: this.msg,
      type: 'text',
      date: new Date(),
      user: this.email
    }

    this.chatService.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = "";
  }

}
