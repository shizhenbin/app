import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
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
              public navCtrl: NavController,
              public tipService: TipService,
              public loadingService: LoadingService) {
    this.items = [1, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9];
  }

  ngOnInit(){

  }

  goDetail() {
    this.loadingService.showLoading();
    setTimeout(()=>{
      console.log('关闭loading');
      this.loadingService.hideLoading();
      this.events.publish('goto', ListDetail);
      //this.navCtrl.setRoot(ListDetail);
    },2000)
  }

  test(){
    console.log('提示语消息');
  }
  doRefresh(refresher: any){
    this.items = [1, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9, 2, 9];
    console.log('下拉刷新');
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infinite:any){
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 15; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infinite.complete();
    }, 500);
  }
}
