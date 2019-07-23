import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';
import { BadgePage } from '../badge/badge.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scene',
  templateUrl: 'scene.page.html',
  styleUrls: ['scene.page.scss']
})
export class ScenePage {
  api: VgAPI;
  // 0 包租婆 1 退休大爷 2 会计师
  scenceId = 0;
  firstFlag = false;
  showBtn = false;
  skipBtn = false;
  music;
  musicList = [
    '../../assets/audio/landlord.mp3',
    '../../assets/audio/grandpa.mp3',
    '../../assets/audio/accountant.mp3'
  ];
  constructor(public modalController: ModalController) {
    const href = window.location.href;
    this.scenceId = Number(href.substring(href.indexOf('/scene/') + 7));
  }
  ngOnInit() {
    this.music = document.getElementById('music');
  }
  onPlayerReady(api: VgAPI) {
    this.music.play();
    let flag1 = false;
    let flag2 = false;
    this.api = api;
    this.api.play();
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(() => {
      if (!this.skipBtn) {
        switch (this.scenceId) {
          case 1:
            if (this.api.getDefaultMedia().currentTime > 7.5 && !flag1) {
              this.api.pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 19.5 && !flag2) {
              this.api.pause();
              flag2 = true;
              this.showBtn = true;
            }
            break;
          case 2:
            if (this.api.getDefaultMedia().currentTime > 11 && !flag1) {
              this.api.pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 16.5 && !flag2) {
              this.api.pause();
              flag2 = true;
              this.showBtn = true;
            }
            break;
          default:
            if (this.api.getDefaultMedia().currentTime > 6 && !flag1) {
              this.api.pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 20 && !flag2) {
              this.api.pause();
              flag2 = true;
              this.showBtn = true;
            }
            break;
        }
      }
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.skipBtn = true;
      this.toBadge();
    });
  }
  continue() {
    this.api.play();
    this.music.play();
    this.showBtn = false;
  }
  skip() {
    this.api.getDefaultMedia().currentTime = 28;
    this.skipBtn = true;
    this.toBadge();
  }
  async toBadge() {
    // 传openid和当前视频id（用于更新badge记录）
    const modal = await this.modalController.create({
      component: BadgePage,
      componentProps: {
        firstName: 'Douglas'
      },
      cssClass: ['badge']
    });
    return await modal.present();
  }
  // dismiss() {
  //   // using the injected ModalController this page
  //   // can "dismiss" itself and optionally pass back data
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }

  onVideoClick() {
    console.log(123);
    if (!this.firstFlag) {
      this.firstFlag = true;
      this.continue();
    }
  }
  // 播放暂停
  playPause() {
    // var btn = document.getElementById('playbtn');
    if (this.music.paused) {
      this.music.play();
      // btn.style.background =
      //   'url(images/music/pictures/pause.png) no-repeat 10px'; // 改变播放暂停键的图标
    } else {
      this.music.pause(); // 停止音乐
      // btn.style.background =
      //   'url(images/music/pictures/play.png) no-repeat 10px';
    }
  }
}
