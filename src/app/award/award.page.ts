import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-award',
  templateUrl: 'award.page.html',
  styleUrls: ['award.page.scss']
})
export class AwardPage {
  awardImgList = [
    '../../assets/images/award_phone.png',
    '../../assets/images/award_kindle.png',
    '../../assets/images/award_ai.png',
    '../../assets/images/award_50.png',
    '../../assets/images/award_30.png',
    '../../assets/images/award_10.png',
    '../../assets/images/award_5.png'
  ];
  awardList;
  remainingTime = new Date('1999-01-01 00:00:00');
  getFlage = false;
  lostFlag = false;
  noneFlag = false;
  constructor(private title: Title, private http: HttpClient) {
    this.title.setTitle('奖励详情');
    this.http
      .get('http://192.168.1.205:9921/content/product/getMyProduct', {
        params: { openid: 'qwerrtytyyuuuss' }
      })
      .subscribe(req => {
        console.log(req);
        const data = req['data'][0];
        if (data.status === -1) {
          this.noneFlag = true;
        } else {
          this.awardList = data;
          // 状态：是否兑奖（-1:未中奖，0:未兑，1:已兑，2:过期）
          switch (data.status) {
            case 0:
              if (new Date(data.expiredTime).getTime() < new Date().getTime()) {
                this.lostFlag = true;
              } else {
                this.clock(data.expiredTime);
              }
              break;
            case 1:
              this.getFlage = true;
              break;
            default:
              break;
          }
        }
      });
  }
  clock(expiredTime) {
    const today = new Date(),
      stopTime = new Date(expiredTime);
    this.remainingTime = new Date(stopTime.getTime() - today.getTime());
    setTimeout(() => {
      this.clock(this.awardList.expiredTime);
    }, 1000);
  }
  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
