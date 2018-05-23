import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { ChooseType } from '../pages/high-end-masonry/choose-type';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SERVICE } from './../service/index';
import { WIDGETS } from './../widgets/index';

import { HIGHENDMASONRY } from './../pages/high-end-masonry/index';
import { LIST } from './../pages/list/index';

@NgModule({
  declarations: [
    MyApp,
    ChooseType,
    ListPage,
    WIDGETS,
    HIGHENDMASONRY,
    LIST
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      mode: 'ios',
      hideTabs: false
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChooseType,
    ListPage,
    WIDGETS,
    HIGHENDMASONRY,
    LIST
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SERVICE
  ]
})
export class AppModule {}
