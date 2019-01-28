import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { SwiperOptions } from 'swiper';

import { SubmitEvent } from '../../models/submit-event.model';
import { UpdateFormData } from '../../state/form-store/actions/form-data.actions';
import { UpdateFormState } from '../../state/form-store/actions/form-state.actions';
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
    this.steps.lockSwipeToNext(true);
  }

  prevSlide() {
    this.steps.slidePrev();
  }

  async updateState(event: SubmitEvent) {
    if (event.state) {
      await this.store.dispatch(new UpdateFormState(event.state));
    }
    await this.nextSlide();
  }

  private async nextSlide() {
    await this.steps.update();
    await this.steps.lockSwipeToNext(false);
    await this.steps.slideNext();
    await this.steps.lockSwipeToNext(true);
  }
}
