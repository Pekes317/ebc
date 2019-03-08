import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import {
  CompleteFormData,
  ErrorFormData,
  FormDataActionTypes,
  SaveFormData,
  ResetFormData,
} from '../actions/form-data.actions';
import { ResetFormState } from '../actions/form-state.actions';
import { ItemsService } from '../../../providers/items.service';

@Injectable()
export class FormDataEffects {
  @Effect()
  completeItme$ = this.actions$.pipe(
    ofType<CompleteFormData>(FormDataActionTypes.CompleteFormData),
    map(action => action),
    tap(() => this.router.navigate(['sidmenu', 'list', 'my-stuff'])),
  );

  @Effect()
  saveItem$ = this.actions$.pipe(
    ofType<SaveFormData>(FormDataActionTypes.SaveFormData),
    map(action => action.payload),
    exhaustMap(item =>
      this.itemService.createItem(item).pipe(
        switchMap(() => [
          new CompleteFormData(),
          new ResetFormData(),
          new ResetFormState(),
        ]),
        catchError(err => of(new ErrorFormData(err))),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private itemService: ItemsService,
    private router: Router,
  ) {}
}
