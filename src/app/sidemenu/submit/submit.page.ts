import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { SwiperOptions } from 'swiper';

import { SubmitEvent } from '../../models/submit-event.model';
import * as fromForm from '../../state/form-store/reducers';

@Component({
  selector: 'ebc-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {
  @ViewChild('steps') steps: IonSlides;

  formPic = this.store.pipe(select(fromForm.selectPic));
  formState = this.store.pipe(select(fromForm.selectStatus));
  stepOptions: SwiperOptions = {
    autoHeight: true,
    centeredSlides: true,
  };

  constructor(private store: Store<fromForm.FormStore>) {}

  ngOnInit() {
   this.lockSlides();
  }

  private async lockSlides() {
    await this.steps.lockSwipeToNext(true);
  }
}
