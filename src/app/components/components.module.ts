import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BaseFormComponent } from './base-form/base-form.component';
import { EmailComponent } from './email/email.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { PicFormComponent } from './pic-form/pic-form.component';
import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { ShareComponent } from './share/share.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { SmsComponent } from './sms/sms.component';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { SvgComponent } from './svg/svg.component';
import { ShareButtonsComponent } from './share-buttons/share-buttons.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [
    BaseFormComponent,
    EmailComponent,
    ImgUploadComponent,
    NavbarComponent,
    NavbarMenuComponent,
    PicFormComponent,
    PrivatePolicyComponent,
    SelectFormComponent,
    ShareComponent,
    ShareButtonsComponent,
    SocialFormComponent,
    SmsComponent,
    SubmitModalComponent,
    SvgComponent
  ],
  entryComponents: [
    NavbarMenuComponent,
    PrivatePolicyComponent,
    ShareComponent
  ],
  exports: [
    ShareButtonsComponent,
    EmailComponent,
    ImgUploadComponent,
    NavbarComponent,
    NavbarMenuComponent,
    SmsComponent,
    SvgComponent
  ]
})
export class ComponentsModule {}
