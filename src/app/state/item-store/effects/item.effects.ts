import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  AddItem,
  DeleteItem,
  ErrorItems,
  GetItem,
  GetItems,
  GetMedia,
  ItemActionTypes,
  LoadMedia,
} from '../actions/item.actions';
import { DeleteCard, LoadCards } from '../actions/card.actions';
import { DeleteFlyer, LoadFlyers } from '../actions/flyer.actions';
import { Item } from '../models/item.model';
import { ItemsService } from '../../../providers/items.service';
import { ItemType } from '../../../util/item-type.enum';

@Injectable()
export class ItemEffects {
  @Effect()
  deleteItem$ = this.actions$.pipe(
    ofType<DeleteItem>(ItemActionTypes.DeleteItem),
    map(action => action.payload),
    exhaustMap(item =>
      this.itemService.deleteItem(item.form, item.id).pipe(
        map(() => this.deleteType(item.form, item.id)),
        catchError(err => of(new ErrorItems(err))),
      ),
    ),
  );

  @Effect()
  getItems$ = this.actions$.pipe(
    ofType<GetItems>(ItemActionTypes.GetItems),
    map(action => action.payload),
    exhaustMap(table =>
      this.itemService.getList(table.list, `${table.form}s`).pipe(
        map((items: Array<Item>) => this.loadType(table.form, items)),
        catchError(err => of(new ErrorItems(err))),
      ),
    ),
  );

  @Effect()
  getItem$ = this.actions$.pipe(
    ofType<GetItem>(ItemActionTypes.GetItem),
    map(action => action.payload),
    exhaustMap(page =>
      this.itemService.getOne(page.id).pipe(
        map((item: Item) => new AddItem(item)),
        catchError(err => of(new ErrorItems(err))),
      ),
    ),
  );

  @Effect()
  getMedia$ = this.actions$.pipe(
    ofType<GetMedia>(ItemActionTypes.GetMedia),
    map(action => action.payload),
    exhaustMap(url =>
      this.itemService.getMedia(url).pipe(
        map((svg: { media: string }) => new LoadMedia(svg.media)),
        catchError(err => of(new ErrorItems(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private itemService: ItemsService) {}

  private loadType(form: string, payload: Array<Item>) {
    return form === ItemType.card
      ? new LoadCards({ cards: payload })
      : new LoadFlyers({ flyers: payload });
  }

  private deleteType(form: string, payload: number) {
    return form === ItemType.card
      ? new DeleteCard({
          id: payload,
        })
      : new DeleteFlyer({ id: payload });
  }
}
