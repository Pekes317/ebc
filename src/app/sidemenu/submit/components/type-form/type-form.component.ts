import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss'],
})
export class TypeFormComponent implements OnInit {
  itemOptions = [
    {
      type: ItemType.card,
    },
    {
      type: ItemType.flyer,
    },
  ];
  itemType: FormControl = new FormControl('');
  typeForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.typeForm = new FormGroup({
      itemType: this.itemType,
    });
  }

  submitType() {}
}
