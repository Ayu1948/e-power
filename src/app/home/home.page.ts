import { Component } from '@angular/core';
import * as createjs from 'createjs-module';
import { BadgePage } from '../badge/badge.page';
import { ModalController } from '@ionic/angular';
import { VgAPI } from 'videogular2/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  src = 'bgm';
  checkModal = false;
  api: VgAPI;
  music;
  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    public modalController: ModalController
  ) {}
  ngOnInit() {
    // this.music = document.getElementById('music');
    // this.music.play();
    // $('.content').click(()=> this.music.play())
  }
  async toBadge() {
    if (!this.checkModal) {
      this.checkModal = true;
      // 传openid和当前视频id（用于更新badge记录）
      this.modalController
        .create({
          component: BadgePage,
          componentProps: {
            pageName: 'home',
            skipBtn: true
          },
          cssClass: ['badge']
        })
        .then(async modal => {
          modal.present();
          const dis = await modal.onDidDismiss();
          console.log(this.checkModal);
          this.checkModal = false;
          this.api.pause();
        });
      // return await ;
    }
  }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    console.log(this.api);
    this.api.play();
  }
  // clickTo(id) {
  //   this.location.replaceState('/scene/' + id);
  //   this.router.navigateByUrl('/scene/' + id, { skipLocationChange: true });
  //   this.api.pause();
  // }
  pauseMusic() {
    // this.music.pause();
  }
  clearBadge() {
    this.http
    .get(GlobalVariable.base_path + '/test/clearBadge', {
      params: { openid: openid }
    })
    .subscribe(req => {console.log(req)})
  }
  clearDraw() {
    this.http
    .get(GlobalVariable.base_path + '/test/clearRecord', {
      params: { openid: openid }
    })
    .subscribe(req => {console.log(req)})
  }
}
