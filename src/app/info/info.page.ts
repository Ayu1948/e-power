import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage {
  formModel: FormGroup;
  fb: FormBuilder = new FormBuilder();
  lotteryNum;
  popShow = false;
  constructor(private title: Title, private http: HttpClient) {
    this.title.setTitle('立即领取');
    this.formModel = this.fb.group({
      // 表单对象
      username: [''],
      mobilePhone: [''],
      address: ['']
    });
    const href = window.location.href;
    this.lotteryNum = href.substring(href.indexOf('/info/') + 6);
  }

  onsubmit(data: any) {
    for (const key in data) {
      if (key === 'username') {
        if (data[key] === '') {
          alert('姓名不能为空！');
          return;
        }
      } else if (key === 'mobilePhone') {
        if (data[key] === '') {
          alert('手机号码不能为空！');
          return;
        } else if (!/^1[3456789]\d{9}$/.test(data[key])) {
          alert('手机号码错误！');
          return;
        }
      } else if (key === 'address') {
        if (data[key] === '') {
          alert('地址不能为空！');
          return;
        }
      }
    }
    data.openid = openid;
    data.awardCode = this.lotteryNum;
    data.mobilePhone = String(data.mobilePhone);
    this.http
      .post('http://192.168.1.205:9921/content/product/receiveMyProduct', data)
      .subscribe(req => {
        console.log(req);
        if (req['errcode'] === 0) {
          this.popShow = true;
        } else {
          alert('信息提交失败！');
        }
      });
  }
  closePop() {
    this.popShow = false;
  }
}
