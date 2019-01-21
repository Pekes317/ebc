import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddFormComponent } from './add-form/add-form.component';
import { DetailFormComponent } from './detail-form/detail-form.component';
import { CatFormComponent } from './cat-form/cat-form.component';
import { MetadataFormComponent } from './metadata-form/metadata-form.component';
import { PicFormComponent } from './pic-form/pic-form.component';
import { SelectFormComponent } from './select-form/select-form.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { TypeFormComponent } from './type-form/type-form.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AddFormComponent,
    CatFormComponent,
    DetailFormComponent,
    MetadataFormComponent,
    PicFormComponent,
    SelectFormComponent,
    SocialFormComponent,
    SubmitModalComponent,
    TypeFormComponent,
  ],
  exports: [
    AddFormComponent,
    CatFormComponent,
    DetailFormComponent,
    MetadataFormComponent,
    PicFormComponent,
    SelectFormComponent,
    SocialFormComponent,
    SubmitModalComponent,
    TypeFormComponent,
  ],
})
export class ComponentsModule {}
