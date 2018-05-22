import {Injectable} from '@angular/core';
import {HttpService} from './../http.service';
import {apis} from './../apis';

@Injectable()
export class HomeService {
  constructor(private _http: HttpService) {
  }

  login() {
    return this._http.get(apis.login());
  }
}
