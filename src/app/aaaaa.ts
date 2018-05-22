import {UserService} from './../services/user.service';
import {SensorService} from './../services/sensor.service';
import {Component, ViewChild, OnInit} from '@angular/core';
import {
  Platform,
  Events,
  NavController,
  App,
  Modal,
  ToastController,
  ModalController,
  LoadingController, DeepLinkConfigToken
} from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {Storage} from '@ionic/storage';
import {ProfileService} from '../services/profile.service';
import {TranslateService} from 'ng2-translate';
import {ToastService} from '../services/toast.service';
import {CheckPage} from './../pages/startup/check';
// import {Deeplinks} from '@ionic-native/deeplinks';
import {HomePage} from "../pages/home/home";
import {ProductPage} from "../pages/product/product";
import {FundDetailPage} from "../pages/product/fund/fund-detail";
import {BondDetailPage} from "../pages/product/bond/bond-detail";
import {NoteDetailPage} from "../pages/product/note/note-detail";
import {OrderPage} from "../pages/order/order";
import {TabsPage} from '../pages/tabs/tabs';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {FileOpener} from "@ionic-native/file-opener";
import {CompanyPage} from "../pages/product/assurance/company";
import {FundOrderPage} from '../pages/product/fund/fund-order';
import {AccessModel} from "../pages/access-model/access-model";
import {StatusBar} from "@ionic-native/status-bar";
import {OsService} from "../services/os.service";
import {SelfServicePage} from "../pages/self-service/self.service";
import {Keyboard} from '@ionic-native/keyboard';
import {SplashScreen} from "@ionic-native/splash-screen";
import {Device} from "@ionic-native/device";
declare var window: any;

@Component({
  templateUrl: './app.component.html'
})
export class MyApp implements OnInit {
  rootPage : any;//TabsPage//CheckPage;
  model: Modal; // 首次安装弹窗
  touchBackAgain: boolean = false;
  env: any = {native: false};
  progress: any;
  @ViewChild('nav') nav: NavController;

  constructor(private platform: Platform,
              private keyboard: Keyboard,
              public events: Events,
              private _profile: ProfileService,
              private translate: TranslateService,
              private sensors: SensorService,
              private app: App,
              private storage: Storage,
              private modalCtrl: ModalController,
              private statusBar: StatusBar,
              private toastCtrl: ToastController,
              public toastService: ToastService,
              private dataStorage: Storage,
              private userService: UserService,
              // private deeplinks: Deeplinks,
              private splashScreen: SplashScreen,
              private device: Device,
              private transfer: Transfer,
              private fileOpener: FileOpener,
              private osService: OsService,
              private appVersion: AppVersion,
              private loadingCtrl: LoadingController
              //  private env: AppEnvConfigurationService
  ) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      this.keyboard.onKeyboardShow().subscribe(() => {
        document.body.classList.add('keyboard-is-open');
      });

      this.keyboard.onKeyboardHide().subscribe(() => {
        setTimeout(() => {
          document.body.classList.remove('keyboard-is-open');
        }, 600)
      });
      this.keyboard.hideKeyboardAccessoryBar(false);
      this.keyboard.disableScroll(true);

      this.env = {
        native: this.platform.is("cordova"),
        ios: this.platform.is("ios"),
        android: this.platform.is("android")
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#0d75e8');
      this.splashScreen.hide();
      //页面链接定位
      // this.deeplinksRoute();

      platform.registerBackButtonAction(() => {

        // 1 如果是在底层页面,往上一层抛
        // 2 如果是弹窗,去掉弹窗,除了某些特殊场景(比如安装后首次进来的提示)
        // 3 如果是在顶层页面,提示再按一次返回就退出
        // 4 接3,如果再按返回,则退出app
        if (this.model && this.model.isOverlay) { // 首次安装后进来
          platform.exitApp();
          return;
        }

        if (this.toastService.isActive) { // 当前有自定义toast，关闭toast
          this.toastService.isActive = false;  //包括toast和model
          if (this.toastService.gobackWhenClose) {
            this.toastService.gobackWhenClose = false;
            this.events.publish('backto');
          }
          return;
        }


        // 基金购买点击查看详情，在详情页面点击android的物理键返回，则要返回到订单列表页而不是pop
        if (this.nav.getPrevious(this.nav.getActive()) && this.nav.getPrevious(this.nav.getActive()).component === FundOrderPage) {
          this.nav.setRoot(TabsPage, {indexTab: 2}).then(() => {
            this.events.publish('gotoTab', 2);
          });
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
      // 版本判断
      this.versionCheck(true);

      this.dataStorage.get('guide-home').then(bool => {
        if (bool) {
          let accessModel = this.modalCtrl.create(AccessModel);
          this.toastService.is_access_modal = true;
          accessModel.present();
        }
      });
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
      this.nav.pop().then(() => this.sensors.pv({pvNames: this.getCurPage()}));
    });
    // 判断版本更新，params为boolean类型
    this.events.subscribe('checkVersion', (params) => {
      this.versionCheck(params);
    });
  }


  // 参数isSilence:boolean 手动or自动的开关，true为自动，false为手动
  private versionCheck(isSilence: boolean = true) {
    if (!this.env.native) return;
    console.log(1,window['cordova'])
    console.log(2,window['cordova']['plugins'])
    var permissions = window['cordova']['plugins']['permissions'];
    let permissionCheck = (apk) => {
      permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);

      function checkPermissionCallback(status) {
        if (!status.hasPermission) {
          var errorCallback = function () {
            console.warn('Storage permission is not turned on');
          }
          permissions.requestPermission(
            permissions.READ_EXTERNAL_STORAGE,
            function (status) {
              if (!status.hasPermission) {
                errorCallback();
              } else {
                upgradeApp(apk);
              }
            },
            errorCallback);
        } else {
          upgradeApp(apk);
        }
      }
    }
    let upgradeApp = (apk) => {
      const fileTransfer: TransferObject = this.transfer.create();
      ;
      let uploading = this.loadingCtrl.create({
        content: "安装包正在下载...",
        dismissOnPageChange: false
      });
      let url = apk; //可以从服务端获取更新APP的路径
      let targetPath = window['cordova']['file']['externalRootDirectory'] + "gfHkStore.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
      uploading.present();
      fileTransfer.onProgress((event) => {
        //进度，这里使用文字显示下载百分比
        setTimeout(() => {
          var downloadProgress = (event.loaded / event.total) * 100;
          uploading.setContent("已经下载：" + Math.floor(downloadProgress) + "%");
          console.log(downloadProgress);
          this.progress = downloadProgress;
          if (downloadProgress > 99) {
            uploading.dismissAll();
          }
        }, 0);
      });
      //url为服务端地址
      //targetPath为设备上的地址
      fileTransfer.download(url, targetPath, true).then(
        (result) => {
          uploading.dismissAll();
          this.fileOpener.open(targetPath, 'application/vnd.android.package-archive').then(() => {
          });
        }, (error) => {
          console.log(JSON.stringify(error));
          uploading.dismissAll();
        }
      );
    }

    let showConfirm = (updateInfo) => {
      this.toastService.confirm({
        title: this.translate.get('CONFIRM.UPDATE')['value'],
        body: updateInfo.mustUpdate ? this.translate.get('CONFIRM.HAVENEW')['value'] : this.translate.get('CONFIRM.IFUPATE')['value'],
        sureBtn: this.translate.get('CONFIRM.IMMEDIATELY')['value'],
        cancelBtn: this.translate.get('CONFIRM.NEXTTIME')['value'],
        onlySure: false,
        onSure: () => {
          let url = updateInfo.container.downloadUrls[0];
          if (url.indexOf('.apk')) {
            setTimeout(() => {
              //  统一走浏览器下载流程更新
              this.osService.openUrlPage(url, '_system');
              // 检测是否有安装权限
              // permissions.hasPermission(permissions.INSTALL_PACKAGES, checkPermissionCallback, null);
              // function checkPermissionCallback(status) {
              //   if (!status.hasPermission) {
              //     UTILS.openUrlPage(url,'_system');
              //   } else {
              //     permissionCheck(url);
              //   }
              // }
            }, 0);
          } else {
            this.osService.openUrlPage(updateInfo.container.downloadUrls[0]);
          }
          if (updateInfo.mustUpdate) { // 强制更新不给继续使用app
            this.toastService.isActive = true;
          }
        },
        onCancel: () => {
          if (updateInfo.mustUpdate) {
            this.platform.exitApp();
            this.toastService.isActive = true;
          } else {
            this.storage.set("versionCheck", +new Date());
          }
        }
      });
    };

    // 版本更新判断
    setTimeout(() => {
      this.env.native && this.env.android && this.appVersion.getPackageName()
        .then((name: string) => {
          return name && this.appVersion.getVersionNumber();
        }).then(version => {
          let channel =this.sensors.getMarket();
          let os = this.device.version;
          let model =this.device.model;
          let uuid = this.device.uuid;
          this.userService.checkVersionUpdate(this.env.android?"android":"ios",version,os, model, channel, uuid).subscribe(updateInfo => {
            if (updateInfo && updateInfo['update']) {
              if (isSilence) {
                this.storage.get("versionCheck").then((data)=>{
                  if(!data || (+new Date() - data as number >= 60 * 24 * 2 * 1000)){ // 两天内不弹框
                    showConfirm(updateInfo);
                  }
                })
              } else {
                showConfirm(updateInfo);
              }
            } else {
              // 手动点击检测版本才执行之一步
              if (!isSilence) {
                this.toastService.confirm({
                  body: this.translate.get('CONFIRM.NEWEST')['value']
                })
              }
            }
          })
        });
    }, 0);
  }

  private getCurPage() {
    let views = this.nav.getViews();
    if (views.length === 0) {
      return "exception occur";
    }
    if (views.length === 1 && views[0].name === "TabsPage") { // 返回底部四个root page（首页、个人中心等）
      return this.app.getActiveNav()["root"].name;
    }
    return views[views.length - 1].name; // 返回具体页面
  }

  ngOnInit() {
    //  let config = this.env.config;
    this.translate.addLangs(["en", "ch", "hk"]);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('ch');
    this.translate.use('ch');
    console.log(this.translate.currentLang)
    this.dataStorage.get('lang').then(data => {
      if (data) {
        this.translate.use(data);
      }
    });

    //TODO: 获取渠道号
  }

  //deeplink配置
  /*deeplinksRoute(): void {
    console.log('hhhhh');
    this.deeplinks.routeWithNavController(this.nav, {
      '/home': HomePage,
      '/order': OrderPage,
      '/product': ProductPage,
      '/fund-detail/:internalCode': FundDetailPage,
      '/bond-detail/:internalCode': BondDetailPage,
      '/note-detail/:internalCode': NoteDetailPage,
      '/assurance': CompanyPage,
      '/self-service': SelfServicePage,
    }).subscribe((match) => {
      console.log('Successfully routed', match);
    }, (nomatch) => {
      console.warn('Unmatched Route', nomatch);
    });
  }*/
}
