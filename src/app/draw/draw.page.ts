import { Component, ViewChild } from '@angular/core';
import { VgAPI, VgPlayer } from 'videogular2/core';

@Component({
  selector: 'app-draw',
  templateUrl: 'draw.page.html',
  styleUrls: ['draw.page.scss']
})
export class DrawPage {
  constructor() {}
  rotaryArrow = document.getElementsByClassName('pointer');
  start() {
    const dataArr = [0, 1, 2, 3, 4, 5, 6, 7];
    const data = dataArr[Math.floor(Math.random() * dataArr.length)];
    console.log(data)
  }
  
}
