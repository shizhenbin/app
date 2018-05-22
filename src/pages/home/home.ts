import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomeService} from './../../service/home/home.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public homeService: HomeService) {

  }

  ngOnInit(){
    /*this.homeService.login().subscribe((res:any)=>{
      console.log(res)
    })*/
  }
}
