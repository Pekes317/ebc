import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ItemCat } from '../../../../util/item-cat.enum';
import { State as FormData } from '../../../../state/form-store/reducers/form-data.reducer';
import { State as FormState } from '../../../../state/form-store/reducers/form-state.reducer';
import { Item } from '../../../../state/item-store/models/item.model';
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
  }

  closeModal() {
    this.modalCtl.dismiss();
  }

  setItem() {
    const { cat } = this.formState;
    const newItem: Partial<Item> = {
      name: this.formData.name,
      desc: this.isDefault ? this.defaultDesc : this.defaultDesc,
      pic: cat === this.isTemp ? this.formData.tempPic : this.formData.pic,
      data: this.setData(),
    };

    this.modalCtl.dismiss(newItem, 'Confirmation');
  }

  private setData() {
    const data = {
      ...this.formData,
    };
    delete data.name;
    delete data.desc;

    return JSON.stringify(data);
  }
}
