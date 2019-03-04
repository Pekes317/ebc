import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { from } from 'rxjs';

import { SubmitEvent } from '../../../../models/submit-event.model';

@Component({
  selector: 'ebc-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.scss'],
})
export class SocialFormComponent implements OnInit {
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() socialData: EventEmitter<SubmitEvent> = new EventEmitter();
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  selected = '';
  socialForm: FormGroup;
  socials: FormArray = new FormArray([
    new FormControl('', Validators.required),
  ]);

  constructor(private action: ActionSheetController) {}

  ngOnInit() {
    this.socialForm = new FormGroup({
      socials: this.socials,
    });
  }

  async addField() {
    const socailAction = await this.action.create({
      header: 'Pick Social Type',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.newField('fb: ');
          },
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            this.newField('instragram: ');
          },
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.newField('twitter: ');
          },
        },
        {
          text: 'Custom',
          icon: 'laptop',
          handler: () => {
            this.newField('');
          },
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel',
          cssClass: 'reset-cancel',
        },
      ],
    });
    socailAction.present();
  }

  goBack() {
    this.back.emit();
  }

  next() {
    const social: SubmitEvent = {
      data: this.socialForm.value,
    };

    this.socialData.emit(social);
  }

  removeField() {
    const index = this.socials.length - 1;
    this.socials.removeAt(index);
  }

  private newField(type: string) {
    this.socials.push(new FormControl(type, Validators.required));
    this.update.emit();
  }
}
