// import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-scene',
  templateUrl: 'scene.page.html',
  styleUrls: ['scene.page.scss']
})
export class ScenePage {
  preload:string = 'auto';
  api:VgAPI;
  constructor() {}
  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.play();
    this.api.seekTime().subscriptions.currentTime.subscribe(()=> {
      console.log(this.api.getDefaultMedia().currentTime)
    })
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        this.api.getDefaultMedia().currentTime = 0;
      }
    );
  }
}
