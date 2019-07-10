// import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Component } from '@angular/core';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-scene',
  templateUrl: 'scene.page.html',
  styleUrls: ['scene.page.scss']
})
export class ScenePage {
  preload = 'auto';
  api: VgAPI;
  flag1 = false;
  flag2 = false;
  constructor() {}
  onPlayerReady(api: VgAPI) {
    let time = 0;
    this.api = api;
    this.api.play();
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(() => {
      time++;
      if (this.api.getDefaultMedia().currentTime > 5 && !this.flag1) {
        this.api.pause();
        alert('啊呀～下雨啦');
        this.flag1 = true;
      }
      if (this.api.getDefaultMedia().currentTime > 15 && !this.flag2) {
        this.api.pause();
        alert('终于到了');
        this.flag2 = true;
      }
      console.log(this.api.getDefaultMedia().currentTime);
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
      // Set the video to the beginning
      this.api.getDefaultMedia().currentTime = 0;
    });
  }
  continue() {
    this.api.play();
  }
}
