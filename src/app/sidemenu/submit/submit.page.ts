import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { SwiperOptions } from 'swiper';

import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { SubmitEvent } from '../../models/submit-event.model';
import { ItemCat } from '../../util/item-cat.enum';
import {
  ResetFormData,
  UpdateFormData,
} from '../../state/form-store/actions/form-data.actions';
import {
  ResetFormState,
  UpdateFormState,
} from '../../state/form-store/actions/form-state.actions';
import { GetTemps } from '../../state/form-store/actions/temp.actions';
import { State } from '../../state/form-store/reducers/form-state.reducer';
import * as fromForm from '../../state/form-store/reducers';

@Component({
  selector: 'ebc-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnDestroy, OnInit {
  @ViewChild('steps') steps: IonSlides;

  exist: ItemCat = ItemCat.exist;
  formData = this.store.pipe(select(fromForm.selectData));
  formState = this.store.pipe(select(fromForm.selectStatus));
  formTemps = this.store.pipe(select(fromForm.selectAll));
  hasPic = false;
  new: ItemCat = ItemCat.new;
  stepOptions: SwiperOptions = {
    autoHeight: true,
    centeredSlides: true,
  };
  temp: ItemCat = ItemCat.temp;

  constructor(
    private modelCtl: ModalController,
    private store: Store<fromForm.FormStore>,
  ) {}

  ngOnInit() {
    this.steps.lockSwipeToNext(true);
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetFormData());
    this.store.dispatch(new ResetFormState());
  }

  confirmSubmission() {
    zip(this.formData, this.formState)
      .pipe(map(form => ({ formData: form[0], formState: form[1] })))
      .subscribe(async form => {
        const modal = await this.modelCtl.create({
          component: ConfirmModalComponent,
          componentProps: form,
        });

        modal.present();
      });
  }

  prevSlide() {
    this.steps.slidePrev();
  }

  async updateSlide() {
    await setTimeout(() => this.steps.updateAutoHeight(), 500);
  }

  async updateState(evt: SubmitEvent) {
    if (evt.state) {
      this.store.dispatch(new UpdateFormState(evt.state));
      this.getTemps(evt.state);
    }
    if (evt.data) {
      this.store.dispatch(new UpdateFormData(evt.data));
    }
    await this.nextSlide();
  }

  private getTemps(state: Partial<State>) {
    if (state.type) {
      this.store.dispatch(new GetTemps(state.type));
    }
    this.setPicture(state);
  }

  private async nextSlide() {
    await this.steps.update();
    await this.steps.lockSwipeToNext(false);
    await this.steps.slideNext();
    await this.steps.lockSwipeToNext(true);
  }

  private setPicture(state: Partial<State>) {
    if (state.cat) {
      this.hasPic = state.cat === this.exist;
    }
  }
}
