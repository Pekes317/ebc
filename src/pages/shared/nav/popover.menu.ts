import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BackandService } from '@backand/angular2-sdk';
import { App, ViewController } from 'ionic-angular';

import { AboutHelpPage } from '../../about-help';
import { LoginPage } from '../../login';

@Component({
  template: `
    <ion-list no-lines>
      <button ion-item (click)="aboutHelp()">
        <span>About &amp; Help <ion-icon name="help-circle"></ion-icon></span>
      </button>
      <button ion-item (click)="signOut()">
        <span ion-text color="danger">Sign Out <ion-icon name="log-out"></ion-icon></span>
      </button>
    </ion-list>
  `
})

export class PopoverMenu {

  constructor(
    private app: App,
    private backand: BackandService,
    private storage: Storage,
    private view: ViewController) { }
  
  aboutHelp() {
    let nav = this.app.getRootNav();
    this.view.dismiss();
    nav.push(AboutHelpPage);
  }

  signOut() {
    let nav = this.app.getRootNav();

    this.backand.signout();
    this.view.dismiss();
    this.storage.clear();
    nav.setRoot(LoginPage);
  }
}
