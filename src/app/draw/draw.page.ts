import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';
import '../../assets/createjs.js';

declare const createjs: any;
@Component({
  selector: 'app-draw',
  templateUrl: 'draw.page.html',
  styleUrls: ['draw.page.scss']
})
export class DrawPage {
  constructor() {}
  // ngOnInit() {
  //   const stage = new createjs.Stage('drawView');
  //   const wrap = new createjs.Bitmap('../../assets/images/draw_bg.png');
  //   stage.addChild(wrap);
  //   stage.update();
  // }

  // rotaryArrow = document.getElementsByClassName('pointer');
  start() {
    const dataArr = [0, 1, 2, 3, 4, 5];
    const data = dataArr[Math.floor(Math.random() * dataArr.length)];
    console.log(data);
  }
}
