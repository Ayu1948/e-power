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
  awardId = 1;
  remainingTime;
  constructor(private title: Title, private http: HttpClient) {
    title.setTitle('奖励详情');
    this.http
      .get('http://192.168.1.205:9921/content/product/getMyProduct', {
        params: { openid: 'o0ovH0l30zdoX8AE1OqQlQxTx38c' }
      })
      .subscribe(req => {
        console.log(req);
        this.awardList = req['data'];
        this.clock(req['data'].expiredTime);
        // console.log(new Date() - new Date());
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
