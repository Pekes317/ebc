import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact } from '@ionic-native/contacts/ngx';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Item } from '../../state/item-store/models/item.model';
import { GetItem, GetMedia } from '../../state/item-store/actions/item.actions';
import { ShareInput } from '../../models/app.model';
import * as fromCards from '../../state/item-store/reducers/card.reducer';
import * as fromFlyers from '../../state/item-store/reducers/flyer.reducer';
import * as fromItems from '../../state/item-store/reducers';

@Component({
  selector: 'ebc-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss']
})
export class ItemPage implements OnInit {
  ebcUrl: string = 'https://ebc.beezleeart.com/card/';
  emailShare: ShareInput;
  itemId: number;
  itemMedia: Observable<string> = this.store.pipe(select(fromItems.selectSvg));
  inState: boolean = true;
  itemState: Observable<Item>;
  smsShare: ShareInput;
  type: string = '';

  constructor(
    private route: ActivatedRoute,
    private contacts: Contacts,
    private store: Store<fromItems.ItemState>,
    private toast: ToastController
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(data => (this.inState = data.inState));
    this.route.params.pipe(take(1)).subscribe(params => {
      this.itemId = params.id;
      this.type = params.form.substr(0, params.form.length - 1);
      this.getItem(params);
    });
    this.getMedia();
    this.setEmail();
    this.setMessage();
  }

  getContact() {
    this.contacts.pickContact().then(contact => {
      this.setEmail(contact);
      this.setMessage(contact);
    });
  }

  getItem(params) {
    if (this.inState) {
      this.itemState =
        params.form === 'cards'
          ? this.store.pipe(
              select(fromCards.selectEntities),
              map(item => item[params.id])
            )
          : this.store.pipe(
              select(fromFlyers.selectEntities),
              map(item => item[params.id])
            );
    } else {
      this.store.dispatch(new GetItem({ id: params.id }));
      this.itemState = this.store.pipe(
        select(fromItems.selectItem),
        map(items => items[0])
      );
    }
  }

  async getMedia() {
    const mediaUrl = await this.itemState.pipe(take(1)).toPromise();
    if(mediaUrl.media) {
      this.store.dispatch(new GetMedia(mediaUrl.media));
    }
  }

  async sentMsg(type: string) {
    let isSent = await this.toast.create({
      message: `Your ${type} as been Sent`,
      position: 'top',
      duration: 5000
    });

    isSent.present();
  }

  setEmail(contact?: Contact) {
    this.emailShare = {
      ebcUrl: `${this.ebcUrl}${this.itemId}`,
      hide: false,
      messText: this.setText()
    };
    if (contact) {
      this.emailShare.contacts = contact.emails;
      this.emailShare.hide = true;
      this.emailShare.name = contact.name;
    }
  }

  setMessage(contact?: Contact) {
    this.smsShare = {
      ebcUrl: `${this.ebcUrl}${this.itemId}`,
      hide: false,
      messText: this.setText()
    };
    if (contact) {
      this.smsShare.contacts = contact.phoneNumbers;
      this.smsShare.hide = true;
      this.smsShare.name = contact.name;
    }
  }

  setText(): string {
    let startText: string = `Check out my interactive EBC ${
      this.type
    }, just touch to connect.`;
    return startText;
  }
}
