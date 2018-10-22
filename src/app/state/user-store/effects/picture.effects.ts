import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserInfo } from 'firebase';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import {
  SavePicture,
  UnloadPicture,
  UploadPicture,
  PictureActionTypes
} from '../actions/picture.actions';
import { PictureService } from '../../../providers/picture.service';
import { UpdateUserPic } from '../actions/user.actions';

@Injectable()
export class PictureEffects {
  @Effect()
  saveImg$ = this.actions$.pipe(
    ofType<SavePicture>(PictureActionTypes.SavePicture),
    map(action => action.payload),
    switchMap(savePic => [new UpdateUserPic(savePic), new UnloadPicture()]),
    tap(() => this.picture.picSaved())
  );

  @Effect()
  uploadImg$ = this.actions$.pipe(
    ofType<UploadPicture>(PictureActionTypes.UploadPicture),
    map(action => action.payload),
    exhaustMap(upload =>
      this.picture.uploadImg(upload).pipe(
        map((res: UserInfo) => new SavePicture({ photoUrl: res.photoURL })),
        catchError(() => of(new UnloadPicture()))
      )
    )
  );

  constructor(private actions$: Actions, private picture: PictureService) {}
}
