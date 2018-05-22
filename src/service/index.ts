import {HomeService} from './home/home.service';
import {HttpService} from './http.service';
import {ToastService} from './toast.service';
import {ProfileService} from './profile.service';

export const SERVICE = [
  HttpService,
  HomeService,
  ToastService,
  ProfileService
];

