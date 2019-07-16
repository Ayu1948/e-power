import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage {
  constructor(private title: Title) {
    title.setTitle('立即领取');
  }
  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }
}
