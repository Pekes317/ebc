import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Item } from '../../state/item-store/models/item.model';

@Component({
  selector: 'ebc-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  ebc: Item | any;

  constructor(private modal: ModalController, private params: NavParams) { }

  ngOnInit() {
    this.ebc = this.params.data;
  }

  closeModal() {
    this.modal.dismiss();
  }
}
