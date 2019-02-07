import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  ErrorTemps,
  GetTemps,
  LoadTemps,
  TempActionTypes,
} from '../actions/temp.actions';
import { Item } from '../../item-store/models/item.model';
import { ItemsService } from '../../../providers/items.service';
import { ListUrls } from '../../../util/list.enum';

@Injectable()
export class TempsEffects {
  @Effect()
  getTemps$ = this.actions$.pipe(
    ofType<GetTemps>(TempActionTypes.GetTemps),
    map(action => action.payload),
    exhaustMap(type =>
      this.itemService.getList(ListUrls.temp, `${type}s`).pipe(
        map((items: Item[]) => new LoadTemps({ temps: items })),
        catchError(err => of(new ErrorTemps(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private itemService: ItemsService) {}
}
