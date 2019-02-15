import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SubmitEvent } from '../../../../models/submit-event.model';
import { PictureState } from '../../../../state/user-store/models/picture-state.model';

@Component({
  selector: 'ebc-pic-form',
  templateUrl: './pic-form.component.html',
  styleUrls: ['./pic-form.component.scss'],
})
export class PicFormComponent implements OnInit {
  @Input() set img(base64: string) {
    this.previewImg = base64;
  }
  @Output() back: EventEmitter<boolean> = new EventEmitter();
  @Output() picData: EventEmitter<SubmitEvent> = new EventEmitter();

  hasImage = false;
  previewImg = '';

  constructor() {}

  ngOnInit() {}

  goBack() {
    this.back.emit();
  }

  next() {
    const imgData: SubmitEvent = {
      data: {
        pic: this.previewImg,
      },
    };

    this.picData.emit(imgData);
  }

  selectImg(picState: PictureState) {
    const imgData: SubmitEvent = {
      data: {
        pic: picState.picFile,
      },
    };
    this.hasImage = picState.newPic;

    this.picData.emit(imgData);
  }
}
