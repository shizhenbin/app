import {Injectable} from '@angular/core';
import { LoadingController } from 'ionic-angular';

interface LoadingConfig {
  spinner?: string;
  content?: string;
  cssClass?: string;
  showBackdrop?: boolean;
  duration?: number
}

const DEF_LOADING: LoadingConfig = {
  spinner: 'IOS',
  content: 'please waiting...',
  cssClass: 'common-loading',
  showBackdrop: true,
  duration: 5000
};

@Injectable()

export class LoadingService {

  public loading = null;
  constructor(public loadingCtrl: LoadingController){

  }
  showLoading(config?: LoadingConfig ) {
    let params = Object.assign({},DEF_LOADING, config );

    this.loading = this.loadingCtrl.create({
      spinner: params.spinner,
      content: params.content,
      duration: params.duration,
      showBackdrop: params.showBackdrop,
      cssClass: params.cssClass
    });
    this.loading.present();
  }

  hideLoading(){
    this.loading.dismiss();
    this.loading = null;
  }

}
