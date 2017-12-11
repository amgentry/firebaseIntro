import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cards: any;

  constructor(public navCtrl: NavController, public dataService:DataProvider, public alertCtrl:AlertController) {
    this.cards = this.dataService.cardList;
  }

  updateCardDesc(card):void {
    let prompt = this.alertCtrl.create({
      title: 'Edit Your Movie Description',
      message: "Add a new movie description below",
      inputs: [
        {
          name: 'cardDesc',
          value: card.cardDesc
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataService.updateCardDesc(card.id, data.cardDesc);
          }
        }
      ]
    });
    prompt.present();
  }


  deleteCard(id):void{
    this.dataService.deleteCard(id)
  }

  likesClicked(card):void {
    card.likes++;
    this.dataService.updateLikes(card);
  }

  addCard():void {
    let prompt = this.alertCtrl.create({
      title: 'Add Card',
      message: "Add the following information",
      inputs: [
        {
          name: 'cardName',
          placeholder: 'User Name'
        },
        {
          name: 'cardAvatar',
          placeholder: 'User Image'
        },
        {
          name: 'cardImg',
          placeholder: 'Movie Image'
        },
        {
          name: 'cardDesc',
          placeholder: 'Movie description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            data['likes'] = 0;
            let today = new Date();
            data['date'] = (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getFullYear();
            this.dataService.addNewCard(data);
          }
        }
      ]
    });
    prompt.present();
  }
}

