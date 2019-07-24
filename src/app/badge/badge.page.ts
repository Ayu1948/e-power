import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-badge',
  templateUrl: 'badge.page.html',
  styleUrls: ['badge.page.scss']
})
export class BadgePage {
  @Input() pageName: string;
  // @Input() lastName: string;
  @Input() scenceId: string;
  // scenceId = 0; // 0 包租婆 1 退休大爷 2 会计师
  getFlag = [false, false, false];
  toDraw = { flag: true, id: 0 };
  constructor(
    public modalController: ModalController,
    private http: HttpClient
  ) {
    this.getBadge();
  }
  ngOnInit() {
    console.log(this.pageName);
    // 接收传过来的视频id
    if (this.pageName === 'scene') {
      this.over(this.scenceId);
    }
  }
  getBadge() {
    this.http
      .get(GlobalVariable.base_path + '/badge/getMyBadge', {
        params: { openid: openid }
      })
      .subscribe(req => {
        console.log(req);
        const arr = req['data'];
        for (const key in arr) {
          if (arr.hasOwnProperty(key) && arr[key] > 0) {
            if (key === 'woman') {
              this.getFlag[0] = true;
            }
            if (key === 'oldman') {
              this.getFlag[1] = true;
            }
            if (key === 'accountant') {
              this.getFlag[2] = true;
            }
          }
        }
        this.getFlag.forEach((v, i) => {
          if (!v) {
            this.toDraw.id = i;
            this.toDraw.flag = false;
            return;
          }
        });
        console.log(this.toDraw);
      });
  }
  over(scenceId) {
    let badge = 'LAND2a76a076480d8e';
    switch (scenceId) {
      case 1:
        badge = 'RETa76a0710db9efca';
        break;
      case 2:
        badge = 'ACC5d255a76a07157';
        break;
      default:
        break;
    }
    this.http
      .post(GlobalVariable.base_path + '/badge/addMyBadge', {
        openid: openid,
        badge
      })
      .subscribe(req => {
        console.log(req);
      });
  }
  dismiss() {
    console.log('click');
    // 只有首页点击进去才可以关掉徽章弹框
    if (this.pageName === 'home') {
      this.modalController.dismiss({
        pageName: this.pageName
      });
    }
  }
  jump(id) {
    // if (id < 0) {
    //   window.location.replace('/draw');
    // } else {
    //   window.location.replace('/scene/' + id);
    // }
    // this.modalController.dismiss({
    //   pageName: this.pageName
    // });
  }
  test() {
    console.log('clickclick');
  }
}
