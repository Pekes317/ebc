import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListPage } from './list.page';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRoutingModule,
    SharedModule,
  ],
  declarations: [ListPage],
})
export class ListPageModule {}
