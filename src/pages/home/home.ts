import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration';
import { AlertController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public users;
  constructor(public navCtrl: NavController, private http: HttpClient, private vibration: Vibration, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    http.get('https://jsonplaceholder.typicode.com/users').subscribe(data=>{this.users=data;
    });
  }
  public islemeal(id){
    this.users.splice(id,1);
  }
  presentActionSheet(id) {
    const actionSheet = this.actionSheetCtrl.create({
      title: this.users[id].name,
      buttons: [
        {
          text: 'Sil',
          role: 'sil',
          handler: () => {
            this.users.splice(id,1);
            const alert = this.alertCtrl.create({
              title: 'Başarılı',
              subTitle: 'Kullanıcı Silindi',
              buttons: ['Tamam']
            });
            alert.present();
            this.vibration.vibrate(1000);
          }
        },{
          text: 'Güncelle',
          role: 'guncelle',
          handler: () => {
            this.showPrompt(id)
            console.log('Archive clicked');
          }
        },{
          text: 'İptal',
          role: 'iptal',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  public yenile(){
    
      const alert = this.alertCtrl.create({
        title: 'Başarılı',
        subTitle: 'Kullanıcı listesi yüklendi',
        buttons: ['Tamam']
      });
      alert.present();
    
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data=>{this.users=data;
    this.vibration.vibrate(2000);
  });
  }
  showPrompt(id) {
    const prompt = this.alertCtrl.create({
      title: 'Güncelle',
      message: "Kullanıcının ismini güncelleyiniz",
      inputs: [
        {
          name: 'yeniisim',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'İptal',
          handler: data => {
            const alert = this.alertCtrl.create({
              title: 'İptal',
              subTitle: 'İsim güncelleme iptal edildi',
              buttons: ['Tamam']
            });
            alert.present();
          }
        },
        {
          text: 'Kaydet',
          handler: data => {
            this.users[id].name=data.yeniisim;
            const alert = this.alertCtrl.create({
              title: 'Başarılı',
              subTitle: 'Kullanıcı ismi güncellendi',
              buttons: ['Tamam']
            });
            alert.present();
            this.vibration.vibrate(1000);
          }
        }
      ]
    });
    prompt.present();
  }
}
