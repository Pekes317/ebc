import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { AboutHelpPage } from './about-help';

@NgModule({
  declarations: [
    AboutHelpPage
  ],
  imports: [
    IonicPageModule.forChild(AboutHelpPage)
  ],
  entryComponents: [
    AboutHelpPage
  ]
})
export class AboutHelpPageModule {}