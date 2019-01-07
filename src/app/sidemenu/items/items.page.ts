import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ListModel } from '../../models/route-data.model';
import { List } from '../../util/list.enum';
import { Item } from '../../state/item-store/models/item.model';
import { ShareComponent } from '../../shared/share/share.component';
import {
  DeleteItem,
  GetItems,
} from '../../state/item-store/actions/item.actions';
import { ItemState } from '../../state/item-store/reducers';
import * as fromCards from '../../state/item-store/reducers/card.reducer';
import * as fromFlyers from '../../state/item-store/reducers/flyer.reducer';
import { ItemType } from '../../util/item-type.enum';

@Component({
  selector: 'ebc-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  public dbTable = '';
  public delete = false;
  public items: Observable<Item[]>;
  public itemsPre = '';
  public itemType = '';

  constructor(
    private alert: AlertController,
    private modal: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ItemState>,
    private toast: ToastController,
  ) {}

  ngOnInit() {
    this.route.data.pipe(take(1)).subscribe((data: ListModel) => {
      this.dbTable = this.setTable(data.list);
      this.itemsPre = data.list;
      this.itemType = data.itemType;
      this.itemsFetch();
      this.items =
        this.itemType === ItemType.card
          ? this.store.pipe(select(fromCards.selectAll))
          : this.store.pipe(select(fromFlyers.selectAll));
    });
  }

  async delAlert(id: number) {
    const confirm = await this.alert.create({
      header: `Delete ${this.itemType}`,
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.ebcDel(id);
          },
        },
      ],
    });

    confirm.present();
  }

  async deleteToast() {
    const del = await this.toast.create({
      message: `The ${this.itemType} has been deleted.`,
      position: 'top',
      duration: 5000,
    });

    del.present();
  }

  ebcDel(id: number) {
    this.store.dispatch(new DeleteItem({ id: id, form: this.dbTable }));
    this.deleteToast();
  }

  goTo(ebc: Item) {
    this.router.navigate([
      'sidemenu',
      'item',
      this.itemsPre.toLowerCase(),
      this.itemType.toLowerCase(),
      ebc.id,
    ]);
  }

  itemsFetch() {
    this.store.dispatch(
      new GetItems({ list: this.dbTable, form: `${this.itemType}s` }),
    );
  }

  async share(ebc: Item) {
    const shareMod = await this.modal.create({
      component: ShareComponent,
      componentProps: ebc,
    });

    shareMod.present();
  }

  private setTable(list: string) {
    switch (list) {
      case List.my:
        this.delete = true;
        return 'item';
      case List.samp:
        this.delete = false;
        return list.toLocaleLowerCase();
      case List.temp:
        this.delete = false;
        return 'temp';
    }
  }
}
