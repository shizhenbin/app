
import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';
import {App, IonicModule, NavController, ModalController, Platform, Events, AlertController} from 'ionic-angular';
import {Navbar, ToastController} from 'ionic-angular';
import {ToastService} from "../../service/toast.service";

declare var Wechat: any;

@Component({
  selector: 'navbar',
  templateUrl: 'nav-bar.component.html'
})
export class NavBarComponent implements AfterViewInit {
  @Input() title: string = ''; // 标题
  @Input() text: string = ''; // back button 文本
  @Input() hideText: boolean = true; // 隐藏文本
  @Input() hideBackButton: boolean = false; // 隐藏回退按钮
  @Input() rightButton: boolean = false;//右侧菜单
  @Input() gobackPage: any;//明确指定返回页面
  @ViewChild('navbar') navbar: Navbar;

  constructor(private navCtrl: NavController,
              private app: App,
              public plt: Platform,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private events: Events,
              private toastService: ToastService) {
  }

  private getCurPage() {
    let views = this.navCtrl.getViews();
    if (views.length === 0) {
      return "exception occur";
    }
    return views[views.length - 1].name; // 返回具体页面
  }

 goBack() {
   if (this.gobackPage == 'homePage') {
     /* this.navCtrl.setRoot(TabsPage, {indexTab: 0}).then(() => {
        this.events.publish('gotoTab', 0);
      });*/
      return;
   } else {
        this.navCtrl.pop().then((data) => {
     });
   }
}
  ngAfterViewInit() {
    if (this.hideBackButton) {
      this.navbar.hideBackButton = this.hideBackButton;
    }
    if (this.hideText) {
      this.navbar.setBackButtonText('');
    }
  }
}
