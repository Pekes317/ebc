import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ebc-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
  picAdd = false;
  socialAdd = false;
  choices = [
    {
      label: '',
      value: this.socialAdd,
    },
    {
      label: '',
      value: this.picAdd,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
