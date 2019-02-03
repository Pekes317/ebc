import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { SwiperOptions } from 'swiper';

import { SubmitEvent } from '../../models/submit-event.model';
import { ItemCat } from '../../util/item-cat.enum';
import { UpdateFormData } from '../../state/form-store/actions/form-data.actions';
import { UpdateFormState } from '../../state/form-store/actions/form-state.actions';
import * as fromForm from '../../state/form-store/reducers';
import { IonicConfig } from '@ionic/core';

@Component({
  selector: 'ebc-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {
  @ViewChild('steps') steps: IonSlides;

  exist: ItemCat = ItemCat.exist;
  formPic = this.store.pipe(select(fromForm.selectPic));
  formState = this.store.pipe(select(fromForm.selectStatus));
  new: ItemCat = ItemCat.new;
  stepOptions: SwiperOptions = {
    autoHeight: true,
    centeredSlides: true,
  };
  temp: ItemCat = ItemCat.temp;

  constructor(private store: Store<fromForm.FormStore>) {}

  ngOnInit() {
    this.steps.lockSwipeToNext(true);
  }

  prevSlide() {
    this.steps.slidePrev();
  }

  updateSlide() {
    this.steps.update();
  }

  async updateState(evt: SubmitEvent) {
    if (evt.state) {
      this.store.dispatch(new UpdateFormState(evt.state));
    }
    if (evt.data) {
      this.store.dispatch(new UpdateFormData(evt.data));
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
