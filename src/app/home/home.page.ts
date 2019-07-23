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
    // createjs.FlashAudioPlugin.swfPath = 'assets/audio'
    // createjs.Sound.registerPlugins([
    //   createjs.WebAudioPlugin,
    //   createjs.FlashAudioPlugin
    // ])
    // createjs.Sound.alternateExtensions = ['mp3']
    // createjs.Sound.on('fileload', loadHandler, this)
    // createjs.Sound.registerSound('assets/audio/bgm.mp3', 'sound')
    // function loadHandler(event) {
    //   // 这会引发针对每个已注册的声音。
    //   var instance = createjs.Sound.play('sound') // 使用id。也可以使用完整路径或event.src来源。
    //   instance.on('complete', this.handleComplete, this)
    //   instance.volume = 0.5
    // }
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
  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
