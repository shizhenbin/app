import {Injectable} from '@angular/core';
import { ToastController } from 'ionic-angular';

interface TipConfig {
  message: string;
  duration?: number;
  position?: string;
  cssClass?: string;
}

const DEF_TIP: TipConfig = {
  message: '',
  duration: 2500,
  position: 'middle',
  cssClass: 'common-tip'
};

@Injectable()

export class TipService {

  constructor(public toastCtrl: ToastController){

  }
  showTip(config?: TipConfig, callback?: Function ) {
    let params = Object.assign({},DEF_TIP, config );
    let toast = this.toastCtrl.create({
      message: params.message,
      duration: params.duration,
      position: params.position,
      cssClass: params.cssClass
    });

    if(callback && typeof callback === "function"){
      toast.onDidDismiss(() => {
        callback();
      });
    }
    toast.present();
  }

}
