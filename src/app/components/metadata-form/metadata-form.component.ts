import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ItemType } from '../../util/item-type.enum';

@Component({
  selector: 'ebc-metadata-form',
  templateUrl: './metadata-form.component.html',
  styleUrls: ['./metadata-form.component.scss'],
})
export class MetadataFormComponent implements OnInit {
  description: FormControl = new FormControl('');
  itemType: ItemType = ItemType.card;
  metaForm: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  titleName = this.setTitle();

  constructor() {}

  ngOnInit() {
    this.metaForm = new FormGroup({
      name: this.name,
      desc: this.description,
    });
  }

  goBack() {}

  submitMeta() {}

  private setTitle() {
    const titleNames = {
      [ItemType.card]: 'Business',
      [ItemType.flyer]: 'Event',
    };

    return titleNames[this.itemType];
  }
}
