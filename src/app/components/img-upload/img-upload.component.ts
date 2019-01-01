import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PictureService } from '../../providers/picture.service';
import { PictureState } from '../../state/user-store/models/picture-state.model';

@Component({
  selector: 'ebc-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnDestroy, OnInit {
  @Input()
  set current(uri: string) {
    this.currentImg = uri;
  }
  @Input()
  set update(state: PictureState) {
    this.currentImg = state.newPic ? state.picFile : this.currentImg;
    this.updateAction = state.newPic;
  }
  @Output()
  imgAction: EventEmitter<PictureState> = new EventEmitter();

  private collector: Subscription;
  private currentImg = '';
  protected updateAction = false;

  constructor(private pic: PictureService) {}

  ngOnInit() {
    this.collector = this.pic
      .getSelected()
      .subscribe(imgData => this.selectData(imgData));
  }

  ngOnDestroy() {
    this.collector.unsubscribe();
  }

  openMenu() {
    this.pic.getPics();
  }

  saveCurrent() {
    const saveImg: PictureState = {
      newPic: false,
      picFile: this.currentImg
    };
    this.imgAction.emit(saveImg);
  }

  private selectData(img: string) {
    const newImg: PictureState = {
      newPic: true,
      picFile: img
    };
    this.imgAction.emit(newImg);
  }
}
