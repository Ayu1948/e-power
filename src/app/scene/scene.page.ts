import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';

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
  constructor() {
    const href = window.location.href;
    this.scenceId = Number(href.substring(href.indexOf('/scene/') + 7));
    console.log(this.scenceId);
  }
  // ngOnInit() {
  //   console.log(333);
  // }
  onPlayerReady(api: VgAPI) {
    // console.log(111);
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
      // Set the video to the beginning
      // this.api.getDefaultMedia().currentTime = 0;
    });
  }
  continue() {
    this.api.play();
    this.showBtn = false;
  }
  skip() {
    this.api.getDefaultMedia().currentTime = 30;
    console.log(this.api.getDefaultMedia().duration);
    this.skipBtn = true;
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
  jump(id) {
    if (id < 0) {
      window.location.replace('/draw');
    } else {
      window.location.replace('/scene/' + id);
    }
  }
}
