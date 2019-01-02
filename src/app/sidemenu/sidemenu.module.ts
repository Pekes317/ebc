import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SidemenuPage } from './sidemenu.page';
import { SidemenuRoutingModule } from './sidemenu-routing.module';
import { ItemStoreModule } from '../state/item-store/item-store.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemStoreModule,
    SidemenuRoutingModule
  ],
  declarations: [SidemenuPage]
})
export class SidemenuPageModule {}
