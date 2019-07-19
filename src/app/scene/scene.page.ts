import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';
import { HttpClient } from '@angular/common/http';

declare const wx: any;
declare const WeixinJSBridge: any;

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
  getFlag = [false, false, false];
  toDraw = { flag: false, id: 0 };
  constructor(private http: HttpClient) {
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
    this.getBadge();
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      this.skipBtn = true;
      this.getFlag[this.scenceId] = true;
      this.over();
    });
  }
  continue() {
    this.api.play();
    this.music.play();
    this.showBtn = false;
  }
  getBadge() {
    this.http
      .get('http://192.168.1.205:9921/content/badge/getMyBadge', {
        params: { openid: 'qwerrtytyyuuuss' }
      })
      .subscribe(req => {
        console.log(req);
        const arr = req['data'];
        for (const key in arr) {
          if (arr.hasOwnProperty(key) && arr[key] > 0) {
            if (key === 'woman') {
              this.getFlag[0] = true;
            }
            if (key === 'oldman') {
              this.getFlag[1] = true;
            }
            if (key === 'accountant') {
              this.getFlag[2] = true;
            }
          }
        }
        this.getFlag.forEach((v, i) => {
          if (!v) {
            this.toDraw.id = i;
            return;
          }
        });
        this.toDraw.flag = true;
      });
  }
  over() {
    let badge = 'LAND2a76a076480d8e';
    switch (this.scenceId) {
      case 1:
        badge = 'RETa76a0710db9efca';
        break;
      case 2:
        badge = 'ACC5d255a76a07157';
        break;
      default:
        break;
    }
    this.http
      .post('http://192.168.1.205:9921/content/badge/addMyBadge', {
        openid: 'qwerrtytyyuuuss',
        badge
      })
      .subscribe(req => {
        console.log(req);
      });
  }
  skip() {
    this.api.getDefaultMedia().currentTime = 28;
    console.log(this.api.getDefaultMedia().duration);
    this.skipBtn = true;
    this.getFlag[this.scenceId] = true;
    this.over();
  }
  toggleFullscreen($event) {
    console.log($event);
  }

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
  jump(id) {
    if (id < 0) {
      window.location.replace('/draw');
    } else {
      window.location.replace('/scene/' + id);
    }
  }
}
