import {Component} from '@angular/core';
@Component({
  selector: 'refresh',
  templateUrl: './refresh.component.html'
})

export class RefreshComponent {
  constructor(){

  }

 /* doRefresh(refresher: any){
    console.log('下拉刷新');
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }*/
}
