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
  constructor(private title: Title, private http: HttpClient) {
    this.title.setTitle('奖励详情');
    this.http
      .get('http://192.168.1.205:9921/content/product/getMyProduct', {
        params: { openid: 'o0ovH0l30zdoX8AE1OqQlQxTx38c' }
      })
      .subscribe(req => {
        console.log(req);
        this.awardList = req['data'];
        if (
          req['data'].lotteryUserId.username !== '' &&
          req['data'].lotteryUserId.mobilePhone !== '' &&
          req['data'].lotteryUserId.address !== ''
        ) {
          this.getFlage = true;
        } else {
          if (
            new Date(req['data'].expiredTime).getTime() < new Date().getTime()
          ) {
            this.lostFlag = true;
          } else {
            this.clock(req['data'].expiredTime);
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
