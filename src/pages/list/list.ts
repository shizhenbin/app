import { Component } from '@angular/core';
import { Events } from 'ionic-angular';
import { ListDetail } from './detail';
import { TipService } from './../../service/tip.service';
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListPage {
  //items: Array<{title: string, note: string, icon: string}>;
  items = [];
  constructor(public events: Events,
              public tipService: TipService,
              public loadingService: LoadingService) {
    this.items = [1, 2, 9]
  }

  ngOnInit(){

  }

  gotoDetail() {
    this.loadingService.showLoading();
    setTimeout(()=>{
      console.log('关闭loading');
      this.loadingService.hideLoading()
    },2000)
   //this.events.publish('goto', ListDetail)
  }

  test(){
    console.log('提示语消息');
  }

}
