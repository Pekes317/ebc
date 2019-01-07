import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EmailComponent } from './email/email.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { ShareComponent } from './share/share.component';
import { SmsComponent } from './sms/sms.component';
import { SvgComponent } from './svg/svg.component';
import { ShareButtonsComponent } from './share-buttons/share-buttons.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [
    EmailComponent,
    ImgUploadComponent,
    NavbarComponent,
    NavbarMenuComponent,
    PrivatePolicyComponent,
    ShareComponent,
    ShareButtonsComponent,
    SmsComponent,
    SvgComponent,
  ],
  entryComponents: [
    NavbarMenuComponent,
    PrivatePolicyComponent,
    ShareComponent,
  ],
  exports: [
    EmailComponent,
    ImgUploadComponent,
    NavbarComponent,
    NavbarMenuComponent,
    SmsComponent,
    ShareButtonsComponent,
    SvgComponent,
  ],
})
export class SharedModule {}
