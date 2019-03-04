import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ItemCat } from '../../../../util/item-cat.enum';
import { State as FormData } from '../../../../state/form-store/reducers/form-data.reducer';
import { State as FormState } from '../../../../state/form-store/reducers/form-state.reducer';

@Component({
  selector: 'ebc-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() formData: FormData;
  @Input() formState: FormState;

  defaultDesc = 'An EBC Product';
  isDefault = false;
  isTemp = ItemCat.temp;

  constructor(private modalCtl: ModalController) {}

  ngOnInit() {
    this.isDefault = this.formData.desc ? false : true;
    console.log(this.formData, this.formState, this.isDefault);
  }

  closeModal() {
    this.modalCtl.dismiss();
  }
}
