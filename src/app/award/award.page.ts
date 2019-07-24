import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';

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
  remainingTime = new Date('1999/01/01 00:00:00');
  getFlage = false;
  lostFlag = false;
  noneFlag = false;
  awardLevel = [
    '特等奖',
    '一等奖',
    '二等奖',
    '三等奖',
    '四等奖',
    '五等奖',
    '六等奖',
    '七等奖'
  ];
  constructor(private title: Title, private http: HttpClient) {
    this.title.setTitle('奖励详情');
    // 全局变量的引入
    this.http
      .get(GlobalVariable.base_path + '/product/getMyProduct', {
        params: { openid: openid }
      })
      .subscribe(req => {
        console.log(req);
        const data = req['data'][0];
        if (data === undefined) {
          this.noneFlag = true;
        } else {
          this.awardList = data;
          // 状态：是否兑奖（1未兑奖，2已兑奖，3已过期）
          switch (data.status) {
            case 2:
              this.getFlage = true;
              this.clock(data.expiredTime);
              break;
            case 3:
              // if (new Date(data.expiredTime).getTime() < new Date().getTime()) {
              this.lostFlag = true;
              break;
            default:
              this.clock(data.expiredTime);
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
}
