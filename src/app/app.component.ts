import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ToastService } from './../service/toast.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  rootPage: any = HomePage;

  touchBackAgain: boolean = false;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public events: Events,
              public toastService: ToastService,
              private toastCtrl: ToastController,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    platform.registerBackButtonAction(() => {

      // 1 如果是在底层页面,往上一层抛
      // 2 如果是弹窗,去掉弹窗,除了某些特殊场景(比如安装后首次进来的提示)
      // 3 如果是在顶层页面,提示再按一次返回就退出
      // 4 接3,如果再按返回,则退出app

      if (this.toastService.isActive) { // 当前有自定义toast，关闭toast
        this.toastService.isActive = false;  //包括toast和model
        if (this.toastService.gobackWhenClose) {
          this.toastService.gobackWhenClose = false;
          this.events.publish('backto');
        }
        return;
      }

      if (this.nav.getViews().length === 1) { // 提示再按一次退出
        if (!this.touchBackAgain) {
          this.touchBackAgain = true;
          let toast = this.toastCtrl.create({
            message: "再按一次后退键退出程序",
            duration: 3000,
            position: 'middle',
            cssClass: 'exit-toast'
          });
          toast.onDidDismiss(() => {
            this.touchBackAgain = false;
          });
          toast.present();
        } else {
          platform.exitApp();
        }
      } else {
        this.nav.pop();
      }
    });

    this.events.subscribe('popTo', (page) => {
      //  页面跳转前关闭toast
      this.toastService.isActive = false;
      this.nav.popTo(page).then(() => this.sensors.pv({pvNames: this.getCurPage()}));
    });
    //页面跳转
    this.events.subscribe('goto', (page, params, opts, done) => {
      //  页面跳转前关闭toast
      this.toastService.isActive = false;

      if (opts && opts.root) {
        this.nav.setRoot(page, params, opts, done);
      } else {
        this.nav.push(page, params, opts, done);
      }
    });
    this.events.subscribe('backto', () => {
      this.nav.pop();
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
