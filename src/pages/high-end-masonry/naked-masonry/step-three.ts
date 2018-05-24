import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {HomeService} from './../../../service/home/home.service';

@Component({
  selector: 'naked-step-three',
  templateUrl: 'step-three.html'
})
export class NakedStepThree {
  step:number = 3;
  slidesItems = [1, 2, 3];
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public homeService: HomeService) {

  }

  ngOnInit(){
  }


  pop(){
    this.navCtrl.pop();
  }

  next(){
    this.events.publish('goto', '');
  }
}
