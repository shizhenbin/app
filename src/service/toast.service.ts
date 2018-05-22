import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs/Subject';

@Injectable()
export class ToastService {
  comfirmSubject = new Subject();

  // comfirmObservable$ = this.comfirmSubject.asObservable();
  _isActive = false;
  gobackWhenClose = false;

  is_access_modal:boolean = false;
  modal = null;

  set isActive(active: boolean) {
    if(active) {
      this._isActive = true;
    } else {
      this._isActive = false;
      if(this.modal) {
        this.modal.dismiss();
        this.modal = null;
      }
    }
  }

  get isActive() {
    return this._isActive || this.modal;
  }

  constructor() {}

  // 普通弹框
  confirm(params: any) {
    this.comfirmSubject.next(params);
    this.isActive = true;
  }

  // 业务成功后弹框，title带成功的icon
  successConfirm(params: any) {
    params = Object.assign(params, {
      title: `<i class="icon-icons icon-icons-success"></i><span>${params['title'] || '温馨提示'}</span>`
    });
    this.comfirmSubject.next(params);
    this.isActive = true;
  }

  // 业务失败后弹框
  errorConfirm(params: any) {
    this.isActive = false;  // 防止需要弹出错误提示时modal处于弹出状态，从而遮挡错误提示框
    params = Object.assign(params, {
      title: `<i class="icon-icons icon-icons-error"></i><span>${params['title'] || '提示'}</span>`
    });
    // 错误提示处理
    let content = params['body'];
    if (content) {
      params['body'] = content;
    }

    this.comfirmSubject.next(params);
    this.isActive = true;
  }

}
