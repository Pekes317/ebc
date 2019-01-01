import { Component, OnInit } from '@angular/core';

import { Page } from '../models/pages.model';

@Component({
  selector: 'ebc-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss']
})
export class SidemenuPage implements OnInit {
  pages: Array<Page> = [
    { title: 'EBC Samples', component: 'list/samples' },
    { title: 'My EBC', component: 'list/my-stuff' },
    { title: 'My Profile', component: 'profile' },
    { title: 'Templates', component: 'list/templates' },
    { title: 'Submit Item', component: 'submit' }
  ];

  constructor() {}

  ngOnInit() {}
}
