import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'ebc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  back = false;

  @Input()
  color = 'primary';

  constructor(
    private menu: MenuController,
    private nav: Location,
    private pop: PopoverController
  ) {}

  ngOnInit() {}

  goBack() {
    this.nav.back();
  }

  async menuOpen(click: Event) {
    const moreMenu = await this.pop.create({
      component: NavbarMenuComponent,
      event: click
    });

    moreMenu.present();
  }

  async sideMenu() {
    await this.menu.open();
  }
}
