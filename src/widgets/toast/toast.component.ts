import {Component} from '@angular/core';
import {ToastService} from '../../service/toast.service';
import {Events} from 'ionic-angular';
import {ProfileService} from './../../service/profile.service';
//import {LoginPage} from '../../pages/login/login';

interface Toast {
  title?: string;
  body?: string;
  cancelBtn?: string;
  sureBtn?: string;
  onlySure?: boolean;
  onSure?: Function;
  onCancel?: Function;
  btnFontColor?: string;
  targetPage?: string; // 跳转到目标页面
  stopMove?: boolean;
}

const DEF_TOAST: Toast = {
  title: '温馨提示',
  body: '',
  cancelBtn: '取消',
  sureBtn: '确定',
  onlySure: true,
  onCancel() {
  },
  onSure() {
  },
  btnFontColor: "#0d75e8",
  targetPage: '',
  stopMove: true
};

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html'
})

export class ToastComponent {
  // bodyHtml: SafeHtml; // body 单独拿出来是处理xss安全问题
  private toast: Toast = {};

  constructor(public toastService: ToastService,
              public profileService: ProfileService,
              private events: Events) {
    this.toastService.comfirmSubject.subscribe((toast: Toast) => {
      Object.assign(this.toast, DEF_TOAST, toast);
      this.toastService.isActive = true;
    });
  }

  // cancel
  cancel() {
    this.toastService.isActive = false;
    this.toast.onCancel();

    if (this.toast.targetPage === 'LoginPage') {
      //this.events.publish('backto');
      this.profileService.isLoggedIn = false; // 改为未登录状态
    }
  }

  // sure
  sure() {
    this.toastService.isActive = false;
    if (this.toast.targetPage === 'LoginPage') {
      // this.profileService.useLogin(this.events, this.toast.targetPage, true).subscribe();
      // 先将登陆状态改为false
      this.profileService.isLoggedIn = false;

      //this.profileService.useLogin(this.events, LoginPage, true).subscribe();
    }
    else {
      this.toast.onSure();
    }
  }

  stopMove(e: Event) {
    if (this.toast.stopMove) {
      e.preventDefault();
    }
  }
}
