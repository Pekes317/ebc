import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { SubmitEvent } from '../../../../models/submit-event.model';

@Component({
  selector: 'ebc-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  @Input() set picOption(disable: boolean) {
    this.disablePic(disable);
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() addData: EventEmitter<SubmitEvent> = new EventEmitter();

  addForm: FormGroup;
  picAdd: FormControl = new FormControl(false);
  socialAdd: FormControl = new FormControl(false);
  choices = [
    {
      control: 'social',
      display: true,
      label: 'Add Social Media/URL',
    },
    {
      control: 'pic',
      display: true,
      label: 'Add Logo/Picture',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.addForm = new FormGroup({
      pic: this.picAdd,
      social: this.socialAdd,
    });
  }

  disablePic(pic: boolean) {
    this.choices[1].display = !pic;
    this.picAdd.setValue(pic);
  }

  goBack() {
    this.back.emit();
  }

  next() {
    const addData: SubmitEvent = {
      state: this.addForm.value,
    };

    this.addData.emit(addData);
  }
}
