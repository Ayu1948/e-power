import { Component } from '@angular/core';
import * as createjs from 'createjs-module';
import { BadgePage } from '../badge/badge.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  src = 'bgm';
  checkModal = false;

  constructor(public modalController: ModalController) {
    console.log(createjs);
    createjs.Sound.on('fileload', () => {
      var instance = createjs.Sound.play('sound');
      instance.volume = 0.5;
    });
    createjs.Sound.registerSound('assets/audio/bgm.mp3', 'sound');
  }
  async toBadge() {
    let dis;
    if (!this.checkModal) {
      this.checkModal = true;
      // 传openid和当前视频id（用于更新badge记录）
      this.modalController
        .create({
          component: BadgePage,
          componentProps: {
            pageName: 'home'
          },
          cssClass: ['badge']
        })
        .then(async modal => {
          modal.present();
          dis = await modal.onDidDismiss();
          console.log(this.checkModal);
          this.checkModal = false;
        });
      // return await ;
    }
  }

  // jump(id) {
  //   window.location.replace('./scene/' + id);
  // }
}
