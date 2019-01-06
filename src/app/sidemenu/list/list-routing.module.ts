import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemType } from '../../util/item-type.enum';
import { List } from '../../util/list.enum';
import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: 'my-stuff',
    data: { list: List.my },
    component: ListPage,
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'cards',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.my, itemType: ItemType.card }
      },
      {
        path: 'flyers',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.my, itemType: ItemType.flyer }
      }
    ]
  },
  {
    path: 'samples',
    data: { list: List.samp },
    component: ListPage,
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'cards',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.samp, itemType: ItemType.card }
      },
      {
        path: 'flyers',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.samp, itemType: ItemType.flyer }
      }
    ]
  },
  {
    path: 'templates',
    data: { list: List.temp },
    component: ListPage,
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'cards',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.temp, itemType: ItemType.card }
      },
      {
        path: 'flyers',
        loadChildren: '../items/items.module#ItemsPageModule',
        data: { list: List.temp, itemType: ItemType.flyer }
      }
    ]
  },
  {
    path: '',
    redirectTo: 'my-stuff/cards',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
