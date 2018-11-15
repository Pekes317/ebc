ls
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Contact } from '@ionic-native/contacts';
import { Item } from '../../state/item-store/models/item.model';
import { ShareInput } from '../../models/app.model';

@Component({
  selector: 'ebc-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  ebc: Item;
  ebcTest: string;
  ebcUrl = 'https://ebc.beezleeart.com/card/';
  message = 'contact';
  selected: Contact;
  share: ShareInput;

  constructor(
    private modal: ModalController,
    private params: NavParams,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.ebc = this.params.data as Item;
    this.ebcTest = `Check out my interactive EBC ${
      this.ebc.flyer ? 'Flyer' : 'Card'
    }, just touch to connect.`;
    console.log(this.ebc.disable);
  }

  closeModal() {
    this.modal.dismiss();
  }

  getContact(contact: Contact) {
    this.selected = contact;
  }

  section(segment: string) {
    this.message = segment;
    this.share = {
      ebcUrl: `${this.ebcUrl}${this.ebc.id}`,
      show: this.share ? true : false,
      messText: this.ebcTest
    };
    if (this.selected) {
      this.share.contacts =
        this.message === 'mail'
          ? this.selected.emails
          : this.selected.phoneNumbers;
      this.share.name = this.selected.name;
    }
  }

  async sentMsg(type: string) {
    const isSent = await this.toast.create({
      message: `Your ${type} as been Sent`,
      position: 'top',
      duration: 5000
    });

    isSent.present();
  }
}
