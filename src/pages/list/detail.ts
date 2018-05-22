import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ToastService } from "../../service/toast.service";

@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class ListDetail {

  constructor(public navCtrl: NavController,
              public toastService :ToastService) {

  }
  back(){
    this.toastService.successConfirm({
      body: '你好~~~~'
    });
    this.navCtrl.pop()
  }
}
