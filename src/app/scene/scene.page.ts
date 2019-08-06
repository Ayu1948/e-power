import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';
import { BadgePage } from '../badge/badge.page';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    'assets/audio/landlord.mp3',
    'assets/audio/grandpa.mp3',
    'assets/audio/accountant.mp3'
  ];
  constructor(private router: Router, public modalController: ModalController) {
    const href = window.location.href;
    this.scenceId = Number(href.substring(href.indexOf('/scene/') + 7));
    console.log('inScene');
  }
  ngOnInit() {
    // this.music = document.getElementById('music');
  }
  onPlayerReady(api: VgAPI) {
    // this.music.play();
    let flag1 = false;
    let flag2 = false;
    this.api = api;
    // this.api.play();
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(() => {
      if (!this.skipBtn) {
        switch (this.scenceId) {
          case 1:
            if (this.api.getDefaultMedia().currentTime > 12 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
              this.toPause();
            }
            if (this.api.getDefaultMedia().currentTime > 30 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
              this.toPause();
            }
            break;
          case 2:
            if (this.api.getDefaultMedia().currentTime > 19 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
              this.toPause();
            }
            if (this.api.getDefaultMedia().currentTime > 29.5 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
              this.toPause();
            }
            break;
          default:
            if (this.api.getDefaultMedia().currentTime > 15 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
              this.toPause();
            }
            if (this.api.getDefaultMedia().currentTime > 25 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
              this.toPause();
            }
            break;
        }
      }
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (!this.skipBtn) {
        this.skipBtn = true;
        this.toBadge();
      }
    });
  }
  // onPlayerReadyAudio(api: VgAPI) {
  //   this.music = api;
  //   console.log(this.music);
  // }
  continue() {
    this.api.play();
    // this.music.play();
    this.showBtn = false;
    console.log(this.api);
  }
  skip() {
    // switch (this.scenceId) {
    //   case 1:
    //     window.location.href =
    //       'https://mp.weixin.qq.com/s/lCvjqrkLPG3vcAcxCukZAg';
    //     break;
    //   case 2:
    //     window.location.href =
    //       'https://mp.weixin.qq.com/s/Tx9e5kRvJaHrZNFm2Tr8AQ';
    //     break;
    //   default:
    //     window.location.href =
    //       'https://mp.weixin.qq.com/s/vUdPsGqTljwvZ7TpieTUuA';
    //     break;
    // }
    this.skipBtn = true;
    this.toBadge();
  }
  async toPause() {
    // 传openid和当前视频id（用于更新badge记录）
    this.modalController
      .create({
        component: BadgePage,
        componentProps: {
          pageName: 'scene',
          flag: 1,
          showBtn: this.showBtn,
          skipBtn: this.skipBtn
        },
        cssClass: ['badge']
      })
      .then(async modal => {
        await modal.present();
        const data = await modal.onDidDismiss();
        if (data.data.flag === 0) {
          this.continue();
        } else {
          this.skip();
        }
        
      });
  }
  async toBadge() {
    // 传openid和当前视频id（用于更新badge记录）
    this.modalController
      .create({
        component: BadgePage,
        componentProps: {
          pageName: 'scene',
          flag: 0,
          scenceId: this.scenceId,
          showBtn: this.showBtn,
          skipBtn: this.skipBtn
        },
        cssClass: ['badge']
      })
      .then(async modal => {
        await modal.present();
        await modal.onDidDismiss();
        location.reload();
      });
  }
  onVideoClick() {
    if (!this.firstFlag) {
      console.log(123);
      this.firstFlag = true;
      this.continue();
    }
  }
}
