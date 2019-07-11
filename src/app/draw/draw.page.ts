import { Component } from '@angular/core';
import * as createjs from 'createjs-module';

@Component({
  selector: 'app-draw',
  templateUrl: 'draw.page.html',
  styleUrls: ['draw.page.scss']
})
export class DrawPage {
  constructor() {}
  ionViewDidEnter() {
    const bg = new Image();
    bg.src = 'assets/images/btn_long.png';
    const stage = new createjs.Stage('drawView');
    const wrap = new createjs.Bitmap(bg);
    stage.addChild(wrap);
    stage.update();
  }
  start() {
    const dataArr = [0, 1, 2, 3, 4, 5];
    const data = dataArr[Math.floor(Math.random() * dataArr.length)];
    console.log(data);
  }
}
