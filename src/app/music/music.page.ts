import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-music',
  templateUrl: 'music.page.html',
  styleUrls: ['music.page.scss']
})
export class MusicPage {
  api: VgAPI;
  constructor(public modalController: ModalController) {}
  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.play();
  }
}
