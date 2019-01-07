import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../../../state/item-store/models/item.model';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss'],
})
export class SelectFormComponent implements OnInit {
  itemType: ItemType = ItemType.card;
  previewImg: string;
  selectForm: FormGroup;
  selectType: FormControl = new FormControl('', Validators.required);
  templates: Array<Item> = [];

  constructor() {}

  ngOnInit() {
    this.selectForm = new FormGroup({
      selectType: this.selectType,
    });
  }

  goBack() {}

  setPreview(pic: Event) {}

  submitTemp() {}
}
