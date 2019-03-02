import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { FormHandlerService } from '../../../../providers/form-handler.service';
import { ItemType } from '../../../../util/item-type.enum';

@Component({
  selector: 'ebc-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnChanges, OnInit {
  @Input() set type(item: ItemType) {
    this.itemType = item;
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() detail: EventEmitter<SubmitEvent> = new EventEmitter();

  detailForm: FormGroup;
  email: FormControl = new FormControl('', this.formValid.emailValidator);
  itemType: ItemType = ItemType.card;
  placeholderText = 'Contact Name';
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

  ngOnChanges() {
    this.placeholderText =
      this.itemType === ItemType.card ? 'Contact Name' : 'Event Name or Title';
  }

  goBack() {
    this.back.emit();
  }

  submitDetail() {
    const detailData: SubmitEvent = {
      data: {
        email: this.email.value,
        phone: this.phone.value,
        title: this.title.value,
      },
    };

    this.detail.emit(detailData);
  }
}
