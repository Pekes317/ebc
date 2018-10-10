import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ItemsPage } from '../items/items.page';
import { ListPage } from './list.page';
import { ListRoutingModule } from './list-routing.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    ListRoutingModule
  ],
  declarations: [ItemsPage, ListPage]
})
export class ListPageModule {}
