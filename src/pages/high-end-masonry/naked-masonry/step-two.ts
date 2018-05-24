import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {HomeService} from './../../../service/home/home.service';
import { NakedStepThree } from './step-three';

@Component({
  selector: 'naked-step-two',
  templateUrl: 'step-two.html'
})
export class NakedStepTwo {
  choose: number;
  dataList = [
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1},
    {field0: 1,field1: 1,field2: 1,field3: 1,field4: 1,field5: 1,field6: 1,field7: 1,field8: 1,field9: 1}
  ];
  step:number = 3;
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public homeService: HomeService) {

  }

  ngOnInit(){
  }

  doChoose(item:any, index:number){
    this.choose = index;
  }

  pop(){
    this.navCtrl.pop();
  }

  next(){
    this.events.publish('goto', NakedStepThree);
  }
}
