import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { ItemCat } from '../../../../util/item-cat.enum';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.scss'],
})
export class CatFormComponent implements OnInit {
  @Input() set type(item: ItemType) {
    this.itemType = item;
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() selected: EventEmitter<SubmitEvent> = new EventEmitter();

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

  goBack() {
    this.back.emit(true);
  }

  setLabel(type: ItemCat) {
    const catTypes = {
      [ItemCat.exist]: `Existing ${this.itemType} Design`,
      [ItemCat.new]: `New ${this.itemType} Design`,
      [ItemCat.temp]: `Template Based ${this.itemType}`,
    };

    return catTypes[type];
  }

  submitCat() {
    const catEvent: SubmitEvent = {
      state: {
        cat: this.catType.value,
        pic: this.catType.value === ItemCat.exist,
      },
    };
    this.selected.emit(catEvent);
  }
}
