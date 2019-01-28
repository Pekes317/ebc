import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.scss'],
})
export class TypeFormComponent implements OnInit {
  @Input() set type(item: ItemType) {
    this.itemType.setValue(item);
  }
  @Output() selected: EventEmitter<SubmitEvent> = new EventEmitter();

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

  submitType() {
    const update: SubmitEvent = {
      state: {
        type: this.itemType.value,
      },
    };
    this.selected.emit(update);
  }
}
