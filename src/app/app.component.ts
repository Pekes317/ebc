import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Events, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UsersDataService } from './providers/users-data.service';
import * as fromUser from './state/user-store/reducers';
import {
  LoadUser,
  RedirectUser,
} from './state/user-store/actions/user.actions';

@Component({
  selector: 'ebc-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private deeplinks: Deeplinks,
    private events: Events,
    private firebase: Firebase,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private store: Store<fromUser.State>,
    private user: UsersDataService,
  ) {}

  ngOnInit() {
    this.initializeApp();
    this.authCheck();
    this.myEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#0d95bb');
      this.splashScreen.hide();

      this.deeplinks
        .route({
          '/card/:id': 'deep',
        })
        .subscribe(
          match => console.log('Successfully matched route', match),
          nomatch => console.log('Successfully matched route', nomatch),
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

    this.storage
      .get('notify')
      .then(res => this.noitified(res))
      .catch(err => console.log(err));
  }

  myEvents() {
    this.events.subscribe('alerts', fire => {
      if (fire) {
        this.registerDevice();
      }
      this.noitified(fire);
    });
  }

  noitified(on: boolean) {
    const push: Subscription = this.pushStream();
    const refresh = this.refreshStream();
    if (!on) {
      push.unsubscribe();
      refresh.unsubscribe();
      // this.removeDevice();
    }
    this.firebase
      .hasPermission()
      .then(enabled => console.log(enabled))
      .catch(err => console.log(err));
  }

  registerDevice() {
    this.storage
      .get('device')
      .then(id => {
        if (!id) {
          this.registerPermissions();
        }
      })
      .catch(err => console.log(err));
  }

  removeDevice() {
    this.storage
      .get('device')
      .then(id => this.user.notifyRemove(id))
      .catch(err => console.log(err));
    this.firebase.unregister();
  }

  private pushStream() {
    return this.firebase.onNotificationOpen().subscribe(data => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });
  }

  private refreshStream() {
    return this.firebase
      .onTokenRefresh()
      .subscribe(
        token => this.user.notifyUpdate(token),
        err => console.log(err),
      );
  }

  private async registerPermissions() {
    try {
      await this.firebase.grantPermission();
      const token = await this.firebase.getToken();
      this.user.notifyEnroll(token);
    } catch (error) {
      this.firebase.logError(error);
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
  }
}
