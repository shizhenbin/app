import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { ListDetail } from './detail';

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPage {
  //items: Array<{title: string, note: string, icon: string}>;
  items = [];
  constructor(public events: Events) {
    this.items = [1, 2, 3]
  }

  gotoDetail() {
    console.log(22222222)
   this.events.publish('goto', ListDetail)
  }
}
