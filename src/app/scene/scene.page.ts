import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';

@Component({
  selector: 'app-scene',
  templateUrl: 'scene.page.html',
  styleUrls: ['scene.page.scss']
})
export class ScenePage {
  @ViewChild(VgPlayer) vgPlayer: VgPlayer;
  api: VgAPI;
  firstFlag = false;
  showBtn = false;
  skipBtn = false;
  constructor() {}

  onPlayerReady(api: VgAPI) {
    let flag1 = false;
    let flag2 = false;
    this.api = api;
    this.api.play();
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(() => {
      if (!this.skipBtn) {
        if (this.api.getDefaultMedia().currentTime > 11 && !flag1) {
          this.api.pause();
          // alert('时间快来不及啦');
          flag1 = true;
          this.showBtn = true;
        }
        if (this.api.getDefaultMedia().currentTime > 16.5 && !flag2) {
          this.api.pause();
          // alert('终于到了');
          flag2 = true;
          this.showBtn = true;
        }
      }
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      alert('终于到我了');
      // Set the video to the beginning
      // this.api.getDefaultMedia().currentTime = 0;
    });
  }
  continue() {
    this.api.play();
    this.showBtn = false;
  }
  skip() {
    this.api.getDefaultMedia().currentTime = 100;
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
  ngAfterViewInit(): void {
    this.vgPlayer.fsAPI.onChangeFullscreen.subscribe(event => {
      this.toggleFullscreen(event);
    });
  }
}
