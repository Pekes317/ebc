import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent implements OnInit {
  @Input() set type(item: ItemType) {
    this.itemType = item;
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() metadata: EventEmitter<SubmitEvent> = new EventEmitter();

  description: FormControl = new FormControl('');
  details: FormControl = new FormControl('');
  itemType: ItemType = ItemType.card;
  metaForm: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  titleName = this.setTitle();

  constructor() {}

  ngOnInit() {
    this.metaForm = new FormGroup({
      name: this.name,
      desc: this.description,
      details: this.details,
    });
  }

  goBack() {
    this.back.emit();
  }

  submitMeta() {
    const metaData: SubmitEvent = {
      data: {
        desc: this.description.value,
        details: this.details.value,
        name: this.name.value,
      },
    };

    this.metadata.emit(metaData);
  }

  private setTitle() {
    const titleNames = {
      [ItemType.card]: 'Business',
      [ItemType.flyer]: 'Event',
    };

    return titleNames[this.itemType];
  }
}
