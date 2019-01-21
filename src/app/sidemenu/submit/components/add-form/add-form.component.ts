import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ebc-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  addForm: FormGroup;
  enableCheck = false;
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
    this.enableConfirm();
  }

  enableConfirm() {
    const selection: boolean[] = [this.picAdd.value, this.socialAdd.value];
    this.enableCheck = selection.some(select => select);
  }

  goBack() {}

  next() {}
}
