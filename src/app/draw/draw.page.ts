import { Component } from '@angular/core';
import * as createjs from 'createjs-module';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-draw',
  templateUrl: 'draw.page.html',
  styleUrls: ['draw.page.scss']
})
export class DrawPage {
  popFlag = false;
  popShow = false;
  account = 0;
  luckFlag = false;
  award = {
    name: '',
    img: 0
  };
  ruleShow = false;
  constructor(private http: HttpClient) {}
  getData() {}
  // btnContainer(text: string, img, btn) {
  //   const txt = new createjs.Text(text, '32px PingFang', '#fff');
  //   txt.x = 85;
  //   txt.y = 21;
  //   const bg = new createjs.Bitmap(img);
  //   btn.addChild(bg, txt);
  // }
  ionViewDidEnter() {
    const stage = new createjs.Stage('drawView');
    const bgImg = new Image();
    bgImg.src = 'assets/images/draw_bg.jpg';
    bgImg.onload = () => {
      const bg = new createjs.Bitmap(bgImg);
      const txt = new createjs.Text('剩余     次', '28px PingFang', '#fff');
      const account = new createjs.Text(
        String(this.account),
        '28px PingFang',
        '#FFC038'
      );
      txt.setTransform(307, 949);
      account.setTransform(377, 949);
      stage.addChild(bg, txt, account);
      stage.update();
      // setTimeout(() => {
      const pointerImg = new Image();
      pointerImg.src = 'assets/images/draw_pointer.png';
      pointerImg.onload = () => {
        const pointer = new createjs.Bitmap(pointerImg);
        pointer.setTransform(375, 604, 1, 1, 0, 0, 0, 70, 98);
        let checking = false;
        pointer.on('mousedown', e => {
          if (checking) {
            return;
          }
          this.http
            .post(GlobalVariable.base_path + '/lottery/draw', {
              openid: openid
            })
            .subscribe(data => {
              console.log(data);
              if (data['msg'] === '没有中奖') {
                this.luckFlag = false;
              } else {
                this.luckFlag = true;
                this.award.name = data['data'].productName;
                this.award.img = data['data'].image;
              }

              checking = true;
              const angle = Number(data['data'].angle + 360 * 15);
              createjs.Tween.get(pointer)
                .to({ rotation: angle }, 5000, createjs.Ease.getPowInOut(4))
                .call(() => {
                  checking = false;
                  pointer.rotation = 0;
                  this.popShow = true;
                  if (!this.luckFlag) {
                    this.popFlag = true;
                    alert('很遗憾!离中奖就差一步之遥');
                  } else {
                    this.popFlag = false;
                    alert('中奖啦！恭喜你获得' + this.award.name);
                  }
                });
            });
          createjs.Ticker.addEventListener('tick', stage);
        });
        stage.addChild(pointer);
        stage.update();
      };
      // const btnImg = new Image();
      // btnImg.src = 'assets/images/draw_btn.png';
      // btnImg.onload = () => {
      //   const share = new createjs.Container();
      //   this.btnContainer('一起玩', btnImg, share);
      //   const play = new createjs.Container();
      //   this.btnContainer('继续玩', btnImg, play);
      //   share.setTransform(62, 1050);
      //   play.setTransform(420, 1050);
      //   stage.addChild(share, play);
      //   stage.update();
      // };
      // }, 500);
    };
  }
  pop(p) {
    const mask = new createjs.Shape();
    mask.graphics
      .beginFill('#000')
      .drawRect(0, 0, 750, 1200)
      .endFill();
    mask.alpha = 0.6;

    const pop = new createjs.Container();
    pop.setTransform(154, 340);
    const popBgImg = new Image();
    popBgImg.src = 'assets/images/pop_bg.png';
    popBgImg.onload = () => {
      const wrap = new createjs.Bitmap(popBgImg);
      pop.addChild(wrap);
    };
    const titImg = new Image();
    titImg.src = 'assets/images/pop_tit_pity.png';
    titImg.onload = () => {
      const title = new createjs.Bitmap(titImg);
      title.setTransform(111, 40);
      pop.addChild(title);
    };
    const txt = new createjs.Text('很遗憾！离中奖就差一步之遥');
    pop;
    p.addChild(mask, pop);
  }
  showRule() {
    this.popShow = true;
    this.ruleShow = true;
  }
  know() {
    this.popShow = false;
    this.ruleShow = false;
  }
  close() {
    this.popShow = false;
  }
}
