import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, MenuController, PopoverController } from '@ionic/angular';

import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'ebc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  back: boolean = false;

  @Input()
  color: string = 'primary';

  constructor(private menu: MenuController, private nav: IonRouterOutlet, private pop: PopoverController) {}

  ngOnInit() {}

  goBack() {
    this.nav.pop();
  }

  async menuOpen(click: Event) {
    const moreMenu = await this.pop.create({
      component: NavbarMenuComponent,
      event: click
    });

    moreMenu.present();
  }

  async sideMenu() {
    await this.menu.open()
  }
}
