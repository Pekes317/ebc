import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsPage } from '../items/items.page';
import { ListPage } from './list.page';

const routes: Routes = [  
  {    
    path: 'my-stuff',
    component: ListPage,
    children: [
      {
        path: '', redirectTo: '/sidemenu/list/my-stuff/(ebc-cards:cards)', pathMatch: 'full'
      },
      { path: 'cards', component: ItemsPage, outlet: 'ebc-cards', data: { list: 'My', itemType: 'Cards' } },
      { path: 'flyers', component: ItemsPage, outlet: 'ebc-flyers', data: { list: 'My', itemType: 'Flyers' } }
    ]
  },
  {
    path: 'samples',
    component: ListPage,
    children: [
      {
        path: '', redirectTo: '/sidemenu/list/samples/(samp-cards:cards)', pathMatch: 'full'
      },
      { path: 'cards', component: ItemsPage, outlet: 'samp-cards', data: { list: 'Sample', itemType: 'Cards' } },
      { path: 'flyers', component: ItemsPage, outlet: 'samp-flyers', data: { list: 'Sample', itemType: 'Flyers' } }
    ]
  },
  {
    path: 'templates',
    component: ListPage,
    children: [
      {
        path: '', redirectTo: '/sidemenu/list/templates/(temp-cards:cards)', pathMatch: 'full'
      },
      { path: 'cards', component: ItemsPage, outlet: 'temp-cards', data: { list: 'Template', itemType: 'Cards' } },
      { path: 'flyers', component: ItemsPage, outlet: 'temp-flyers', data: { list: 'Template', itemType: 'Flyers' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}