import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Deeplinks, DeeplinkMatch } from '@ionic-native/deeplinks/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { select, Store } from '@ngrx/store';

import { UsersDataService } from './providers/users-data.service';
import * as fromRoot from './state/reducers';
import {
  LoadUser,
  RedirectUser,
} from './state/user-store/actions/user.actions';

@Component({
  selector: 'ebc-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  private appSettings = this.store.pipe(select(fromRoot.getSettings));
  private deeplink: DeeplinkMatch | null = null;
  private hasDeeplink = false;

  constructor(
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private deeplinks: Deeplinks,
    private firebase: Firebase,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private store: Store<fromRoot.State>,
    private user: UsersDataService,
  ) {}

  ngOnInit() {
    this.initializeApp();
    this.authCheck();
    this.checkSettings();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0d95bb');
      this.splashScreen.hide();

      this.deeplinks
        .route({
          '/card/:id': '/sidemenu/ebc/',
        })
        .subscribe(
          match => {
            this.deeplink = match;
            this.hasDeeplink = true;
          },
          nomatch => this.firebase.logError(`No route matched ${nomatch}`),
        );
    });
  }

  authCheck() {
    this.fireAuth.idToken.subscribe(token => {
      const user = this.fireAuth.auth.currentUser;
      if (token) {
        const authUser = {
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        };
        this.setAuthState(true, token, authUser);
      } else {
        this.setAuthState(false);
      }
    });
  }

  private checkSettings() {
    this.appSettings.subscribe(settings => {
      this.setNotify(settings.notify);
    });
  }

  private isRedirected() {
    if (this.hasDeeplink) {
      console.log(this.deeplink);
    }
  }

  private setAuthState(status: boolean, authToken?: string, user?: any) {
    if (status) {
      const authUser = {
        ...user,
        token: authToken,
      };
      this.store.dispatch(new LoadUser(authUser));
      this.store.dispatch(new RedirectUser('/sidemenu'));
    } else {
      this.store.dispatch(new RedirectUser('/login'));
    }
    this.isRedirected();
  }

  private setNotify(notify: boolean) {
    if (notify) {
      this.firebase
        .onTokenRefresh()
        .subscribe(token => this.user.notifyUpdate(token));
      this.firebase.onNotificationOpen();
    }
  }
}
