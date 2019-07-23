import { Component } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  src = 'bgm';
  // isPlaying = false;

  constructor() {
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
  test() {
    console.log(222);
    // createjs.Sound.registerSound("assets/audio/bgm.mp3", 'bgm');
    createjs.Sound.play('sound');
  }
  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
