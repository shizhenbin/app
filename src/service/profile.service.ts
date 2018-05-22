import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs/Rx';
import {HttpService} from './http.service';

import {apis} from './apis';
import {Events} from 'ionic-angular';

@Injectable()
export class ProfileService {
  public _baseInfo: any;  // 客户基本信息
  private _isLoggedIn: boolean = false;
  public observerLogin: Observer<any>;


  constructor(private _httpService: HttpService
  ) {
  }

  useLogin(event: Events, page, reLogin: boolean = false): Observable<any> {
    return new Observable(observer => {
      this._httpService.observerLogin = observer;
      // 默认情况下reLogin = false, 当登录失效后点击提示框的确定按钮重新登录则reLogin = true
      event.publish('goto', page, {
        reLogin: reLogin
      });
    });
  }

  // 登录接口
  toLogin(_body: Object = {}): Observable<any> {
    return new Observable(observer => {
      this._httpService.post(apis.login(), {
        body: _body
      }).subscribe(data => {

      }, data => {
        this._isLoggedIn = false;
      });
    });
  }

  logout(): Observable<any> {
    return new Observable(observer=> {
     /* this._httpService.post(apis.logout()).subscribe(data => {
        this._isLoggedIn = false;
        this._baseInfo = null;
        observer.next();
      });*/
    });
  }


  get baseInfo() {
    return this._baseInfo;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  set isLoggedIn(login: boolean) {
    this._isLoggedIn = login;
  }
}
