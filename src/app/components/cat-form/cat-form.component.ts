import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ItemCat } from '../../util/item-cat.enum';
import { ItemType } from '../../util/item-type.enum';

@Component({
  selector: 'ebc-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.scss'],
})
export class CatFormComponent implements OnInit {
  catForm: FormGroup;
  catType: FormControl = new FormControl('', Validators.required);
  itemType: ItemType = ItemType.card;
  optionCat = [
    {
      type: ItemCat.temp,
    },
    {
      type: ItemCat.exist,
    },
    {
      type: ItemCat.new,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.catForm = new FormGroup({
      catType: this.catType,
    });
  }

  goBack() {}

  setLabel(type: ItemCat) {
    const catTypes = {
      [ItemCat.exist]: `Existing ${this.itemType} Design`,
      [ItemCat.new]: `New ${this.itemType} Design`,
      [ItemCat.temp]: `Template Based ${this.itemType}`,
    };

    return catTypes[type];
  }

  submitCat() {}
}
