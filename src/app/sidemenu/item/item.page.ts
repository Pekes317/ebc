import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Contact } from '@ionic-native/contacts/ngx';
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
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  ebcUrl = 'https://ebc.beezleeart.com/card/';
  itemId: number;
  itemMedia: Observable<string> = this.store.pipe(select(fromItems.selectSvg));
  inState = true;
  itemState: Observable<Item>;
  message = 'contact';
  selected: Contact;
  share: ShareInput;
  type = '';

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromItems.ItemState>,
    private toast: ToastController,
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(take(1))
      .subscribe(data => (this.inState = data.inState));
    this.route.params.pipe(take(1)).subscribe(params => {
      this.itemId = params.id;
      this.type = params.form;
      this.getItem(params);
    });
    this.getMedia();
  }

  getContact(contact: Contact) {
    this.selected = contact;
  }

  getItem(params: Params) {
    if (this.inState) {
      this.itemState =
        params.form === 'card'
          ? this.store.pipe(
              select(fromCards.selectEntities),
              map(item => item[params.id]),
            )
          : this.store.pipe(
              select(fromFlyers.selectEntities),
              map(item => item[params.id]),
            );
    } else {
      this.store.dispatch(new GetItem({ id: params.id }));
      this.itemState = this.store.pipe(
        select(fromItems.selectItem),
        map(items => items[0]),
      );
    }
  }

  async getMedia() {
    const mediaUrl = await this.itemState.pipe(take(1)).toPromise();
    if (mediaUrl.media) {
      this.store.dispatch(new GetMedia(mediaUrl.media));
    }
  }

  section(segment: string) {
    this.message = segment;
    this.share = {
      ebcUrl: `${this.ebcUrl}${this.itemId}`,
      show: false,
      messText: this.setText(),
    };
    if (this.selected) {
      this.share.contacts =
        this.message === 'mail'
          ? this.selected.emails
          : this.selected.phoneNumbers;
      this.share.show = true;
      this.share.name = this.selected.name;
    }
  }

  async sentMsg(type: string) {
    const isSent = await this.toast.create({
      message: `Your ${type} as been Sent`,
      position: 'top',
      duration: 5000,
    });

    isSent.present();
  }

  setText(): string {
    const startText = `Check out my interactive EBC ${
      this.type
    }, just touch to connect.`;
    return startText;
  }
}
