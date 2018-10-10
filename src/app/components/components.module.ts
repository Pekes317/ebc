import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PrivatePolicyComponent } from './private-policy/private-policy.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { EmailComponent } from './email/email.component';
import { SmsComponent } from './sms/sms.component';
import { SvgComponent } from './svg/svg.component';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { BaseFormComponent } from './base-form/base-form.component';
import { PicFormComponent } from './pic-form/pic-form.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { ShareComponent } from './share/share.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [
    PrivatePolicyComponent,
    NavbarComponent,
    NavbarMenuComponent,
    EmailComponent,
    SmsComponent,
    SvgComponent,
    SubmitModalComponent,
    BaseFormComponent,
    PicFormComponent,
    SelectFormComponent,
    SocialFormComponent,
    ShareComponent
  ],
  entryComponents: [
    NavbarMenuComponent,
    PrivatePolicyComponent,
    ShareComponent
  ],
  exports: [
    EmailComponent,
    NavbarComponent,
    NavbarMenuComponent,
    SmsComponent,
    SvgComponent
  ]
})
export class ComponentsModule {}
