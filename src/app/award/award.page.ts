import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-award',
  templateUrl: 'award.page.html',
  styleUrls: ['award.page.scss']
})
export class AwardPage {
  awardList = [
    {
      name: '华为 P30【全新版本6+128G】一部',
      img: '../../assets/images/award_phone.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: 'KINDLE（青春版4GB）一台',
      img: '../../assets/images/award_kindle.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: '天猫一台',
      img: '../../assets/images/award_ai.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: '话费50元',
      img: '../../assets/images/award_50.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: '话费30元',
      img: '../../assets/images/award_30.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: '话费10元',
      img: '../../assets/images/award_10.png',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    },
    {
      name: '话费5元',
      img: '',
      tip:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. '
    }
  ];
  awardId = 1;
  constructor(private title: Title) {
    title.setTitle('奖励详情');
  }

  jump(id) {
    window.location.replace('/scene/' + id);
  }
}
