import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Contacts } from '@ionic-native/contacts/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { File } from '@ionic-native/file/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule
  ],
  declarations: []
})
export class ProvidersModule {
  public constructor(@Optional() @SkipSelf() parentModule: ProvidersModule) {
    if (parentModule) {
      throw new Error(
        'ProvidersModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProvidersModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,  multi: true },        
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AppAvailability,
        AppRate,
        AppVersion,
        AuthInterceptorService,
        Camera,
        Contacts,
        Deeplinks,
        File,
        Firebase,
        InAppBrowser,
        LaunchNavigator,
        NavController,
        SocialSharing,
        SplashScreen,
        StatusBar
       ],
    };
  }
 }
