import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ChatsService, chat } from '../service/chats.service';
import { ModalController, ActionSheetController } from "@ionic/angular";
import { ChatComponent } from '../component/chat/chat.component';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public chatRooms: any = [];
  

  constructor(
    public authservice : AuthService,
    public chatservice : ChatsService,
    private modal : ModalController,
    public actionSheetController: ActionSheetController,
    private AFauth: AngularFireAuth) {}

  onLogout() {
    this.authservice.logout();
  }

  ngOnInit() {


    this.chatservice.getChatRooms().subscribe( chats => {

      this.chatRooms = chats;

    })
  }

  openChat(chat){
    
    this.modal.create({
     component: ChatComponent,
     componentProps: {
       chat: chat
     }
    }).then((modal) => modal.present())
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectar',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          
          this.onLogout()
        }
      }, 
/*       {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      } */
    ]
    });
    await actionSheet.present();
  }

}
