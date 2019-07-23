import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-badge',
  templateUrl: 'badge.page.html',
  styleUrls: ['badge.page.scss']
})
export class BadgePage {
  @Input() pageName: string;
  // @Input() lastName: string;
  // @Input() middleInitial: string;
  scenceId = 0; // 0 包租婆 1 退休大爷 2 会计师
  getFlag = [false, false, false];
  toDraw = { flag: false, id: 0 };
  constructor(
    public modalController: ModalController,
    private http: HttpClient
  ) {
    this.getBadge();
  }
  ngOnInit() {
    console.log(this.pageName);
    // 接收传过来的视频id
    this.over(this.scenceId);
  }
  getBadge() {
    this.http
      .get('http://192.168.1.205:9921/content/badge/getMyBadge', {
        params: { openid: 'qwerrtytyyuuuss' }
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
            return;
          }
        });
        this.toDraw.flag = true;
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
      .post('http://192.168.1.205:9921/content/badge/addMyBadge', {
        openid: 'qwerrtytyyuuuss',
        badge
      })
      .subscribe(req => {
        console.log(req);
      });
  }
  dismiss() {
    // 只有首页点击进去才可以关掉徽章弹框
    if (this.pageName === 'home') {
      this.modalController.dismiss();
    }
  }
  jump(id) {
    if (id < 0) {
      window.location.replace('/draw');
    } else {
      window.location.replace('/scene/' + id);
    }
  }
}
