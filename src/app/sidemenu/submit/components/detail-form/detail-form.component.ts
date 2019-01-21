import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { FormHandlerService } from '../../../../providers/form-handler.service';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit {
  detailForm: FormGroup;
  email: FormControl = new FormControl('', this.formValid.emailValidator);
  itemType: ItemType = ItemType.card;
  phone: FormControl = new FormControl('', this.formValid.phoneValidator);
  title: FormControl = new FormControl('');

  constructor(private formValid: FormHandlerService) {}

  ngOnInit() {
    this.detailForm = new FormGroup({
      email: this.email,
      phone: this.phone,
      title: this.title,
    });
  }

  goBack() {}

  submitDetail() {}
}
