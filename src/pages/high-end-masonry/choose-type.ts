import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { HomeService } from './../../service/home/home.service';
import { NakedStepOne } from  './naked-masonry/step-one';

@Component({
  selector: 'choose-type',
  templateUrl: 'choose-type.html'
})
export class ChooseType {

  types = [
    {title: '选裸钻', page: NakedStepOne},
    {title: '选款式', page: NakedStepOne},
    {title: '选情侣', page: NakedStepOne}
  ];
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public homeService: HomeService) {

  }

  ngOnInit(){
  }

  toChoose(page:any){
    console.log(page)
    this.events.publish('goto', page);
  }
}
