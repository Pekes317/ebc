import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

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
    this.newImg = state.picFile;
    this.updateAction = state.newPic;
  }
  @Output()
  imgAction: EventEmitter<PictureState> = new EventEmitter();

  private currentImg: string = '';
  private newImg: string = '';
  private updateAction: boolean = false;
  private uploadEnable: boolean = false;

  constructor(private pic: PictureService) {}

  ngOnInit() {
    this.pic.selectPic.subscribe(imgData => this.selectData(imgData));
  }

  ngOnDestroy() {
    this.pic.selectPic.unsubscribe();
  }

  openMenu() {
    this.pic.getPics();
  }

  saveImg() {
    // this.imgAction.emit(false);
  }

  private selectData(img: string) {
    const newImg: PictureState = {
      newPic: true,
      picFile: img,
    }
    this.imgAction.next(newImg);
  }
}
