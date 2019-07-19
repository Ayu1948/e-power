import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  music;
  constructor() {
    this.music = document.getElementById('music');
    // this.music.play();
  }
  
  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
