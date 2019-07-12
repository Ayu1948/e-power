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
    const stage = new createjs.Stage('drawView');
    const bgImg = new Image();
    bgImg.src = 'assets/images/draw_bg.png';
    bgImg.onload = () => {
      const bg = new createjs.Bitmap(bgImg);
      stage.addChild(bg);
      stage.update();
    };
    const pointerImg = new Image();
    pointerImg.src = 'assets/images/draw_pointer.png';
    pointerImg.onload = () => {
      const pointer = new createjs.Bitmap(pointerImg);
      pointer.setTransform(384, 543, 1, 1, 0, 0, 0, 70, 98);
      let checking = false;
      pointer.on('mousedown', e => {
        console.log(checking);
        if (checking) { return; }
        checking = true;
        const dataArr = [0, 1, 2, 3, 4, 5];
        const data = dataArr[Math.floor(Math.random() * dataArr.length)];
        const angle = (360 / 6) * data + 360 * 15;
        createjs.Tween.get(pointer)
          .to({ rotation: angle }, 5000, createjs.Ease.getPowInOut(4))
          .call(() => {
            console.log(data);
            checking = false;
            pointer.rotation = 0;
          });
        createjs.Ticker.addEventListener('tick', stage);
      });
      stage.addChild(pointer);
      stage.update();
    };
  }
  handleComplete(queue) {}
  start() {
    const dataArr = [0, 1, 2, 3, 4, 5];
    const data = dataArr[Math.floor(Math.random() * dataArr.length)];
    console.log(data);
  }
}
