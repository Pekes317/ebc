import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
	{
    path: '',
    component: SidemenuPage,
    children: [
      { path: '', redirectTo: 'list/my-stuff', pathMatch: 'full' },
      { path: 'edit', loadChildren: './edit/edit.module#EditPageModule' },
      { path: 'item/:list/:form/:id', loadChildren: './item/item.module#ItemPageModule', data: { inState: true } },
      { path: 'list', loadChildren: './list/list.module#ListPageModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },      
      { path: 'submit', loadChildren: './submit/submit.module#SubmitPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidemenuRoutingModule {}