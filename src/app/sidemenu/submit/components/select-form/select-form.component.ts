import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { Item } from '../../../../state/item-store/models/item.model';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss'],
})
export class SelectFormComponent implements OnInit {
  @Input() set type(item: ItemType) {
    this.itemType = item;
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() selected: EventEmitter<SubmitEvent> = new EventEmitter();

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

  goBack() {
    this.back.emit(true);
  }

  setPreview(pic: Event) {}

  submitTemp() {
    const tempData: SubmitEvent = {
      data: {
        tempName: '',
        tempPic: '',
      },
    };

    this.selected.emit(tempData);
  }
}
