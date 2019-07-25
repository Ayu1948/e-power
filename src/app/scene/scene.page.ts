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
            if (this.api.getDefaultMedia().currentTime > 9.5 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 29 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
            }
            break;
          case 2:
            if (this.api.getDefaultMedia().currentTime > 17 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 29 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
            }
            break;
          default:
            if (this.api.getDefaultMedia().currentTime > 8 && !flag1) {
              this.api.getDefaultMedia().pause();
              flag1 = true;
              this.showBtn = true;
            }
            if (this.api.getDefaultMedia().currentTime > 23 && !flag2) {
              this.api.getDefaultMedia().pause();
              flag2 = true;
              this.showBtn = true;
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
    this.api.getDefaultMedia().play();
    this.showBtn = false;
    console.log(this.api);
  }
  skip() {
    switch (this.scenceId) {
      case 1:
        window.location.href =
          'https://mp.weixin.qq.com/s/lCvjqrkLPG3vcAcxCukZAg';
        break;
      case 2:
        window.location.href =
          'https://mp.weixin.qq.com/s/Tx9e5kRvJaHrZNFm2Tr8AQ';
        break;
      default:
        window.location.href =
          'https://mp.weixin.qq.com/s/vUdPsGqTljwvZ7TpieTUuA';
        break;
    }
    // this.skipBtn = true;
    // this.toBadge();
  }
  async toBadge() {
    // 传openid和当前视频id（用于更新badge记录）
    const modal = await this.modalController.create({
      component: BadgePage,
      componentProps: {
        pageName: 'scene',
        scenceId: this.scenceId
      },
      cssClass: ['badge']
    });
    return await modal.present();
  }

  onVideoClick() {
    if (!this.firstFlag) {
      console.log(123);
      this.firstFlag = true;
      // this.api.getMediaById('music').play();
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
