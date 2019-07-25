import { Component } from '@angular/core';
import * as createjs from 'createjs-module';
import { BadgePage } from '../badge/badge.page';
import { ModalController } from '@ionic/angular';
import { VgAPI } from 'videogular2/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  src = 'bgm';
  checkModal = false;
  api: VgAPI;
  constructor(
    private location: Location,
    private router: Router,
    public modalController: ModalController
  ) {}
  async toBadge() {
    let dis;
    if (!this.checkModal) {
      this.checkModal = true;
      // 传openid和当前视频id（用于更新badge记录）
      this.modalController
        .create({
          component: BadgePage,
          componentProps: {
            pageName: 'home'
          },
          cssClass: ['badge']
        })
        .then(async modal => {
          modal.present();
          dis = await modal.onDidDismiss();
          console.log(this.checkModal);
          this.checkModal = false;
        });
      // return await ;
    }
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.play();
  }
  clickTo(id) {
    this.location.replaceState('/scene/' + id);
    this.router.navigateByUrl('/scene/' + id, { skipLocationChange: true });
    this.api.pause();
  }
}
