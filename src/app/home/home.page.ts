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
  // isPlaying = false;

  constructor(public modalController: ModalController) {
    console.log(createjs);
    createjs.Sound.on('fileload', () => {
      var instance = createjs.Sound.play('sound');
      instance.volume = 0.5;
    });
    createjs.Sound.registerSound('assets/audio/bgm.mp3', 'sound');
  }
  async toBadge() {
    // 传openid和当前视频id（用于更新badge记录）
    const modal = await this.modalController.create({
      component: BadgePage,
      componentProps: {
        pageName: 'home'
      },
      cssClass: ['badge']
    });
    return await modal.present();
  }
  // jump(id) {
  //   window.location.replace('./scene/' + id);
  // }
}
