import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'ebc-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.scss'],
})
export class SocialFormComponent implements OnInit {
  selected = '';
  socialForm: FormGroup;
  socials: FormArray = new FormArray([new FormControl('')]);

  constructor(private action: ActionSheetController) {}

  ngOnInit() {
    this.socialForm = new FormGroup({
      social: this.socials,
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

  goBack() {}

  socialAdded() {
    const added = this.socialForm.dirty;
    return added;
  }

  socialData() {
    return this.socialForm.value;
  }

  private newField(type: string) {
    this.socials.push(new FormControl(type));
  }
}
