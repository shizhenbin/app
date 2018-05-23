import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import {HomeService} from './../../../service/home/home.service';

@Component({
  selector: 'naked-step-one',
  templateUrl: 'step-one.html'
})
export class NakedStepOne {

  types = [
    {title: '选裸钻', page: ''},
    {title: '选款式', page: ''},
    {title: '选情侣', page: ''}
  ];
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public homeService: HomeService) {

  }

  ngOnInit(){
  }

  toChoose(page:any){
    this.events.publish(page);
  }
}
