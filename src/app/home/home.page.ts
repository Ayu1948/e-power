import { Component } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  // src = 'assets/audio/bgm.mp3';
  // isPlaying = false;
  constructor() {
    createjs.Sound.alternateExtensions = ['mp3'];
    createjs.Sound.on('fileload', () => {
      createjs.Sound.play('sound2');
    });
    createjs.Sound.registerSound('assets/audio/bgm.mp3', 'sound2');
    // 加载完成后
  }

  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
