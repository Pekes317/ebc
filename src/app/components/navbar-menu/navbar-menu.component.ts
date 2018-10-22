import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'ebc-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {
  constructor(
    private fireAuth: AngularFireAuth,
    private pop: PopoverController,
    private router: Router,
    private storage: Storage,
  ) {}

  ngOnInit() {}

  openPage(page: string) {
    this.router.navigate([page]);
    this.pop.dismiss();
  }

  signOut() { 
    this.fireAuth.auth.signOut();
    this.storage.clear();
    this.pop.dismiss();
  }
}
