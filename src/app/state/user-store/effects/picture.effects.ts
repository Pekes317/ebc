import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  SavePicture,
  UnloadPicture,
  UploadPicture,
  PictureActionTypes
} from '../actions/picture.actions';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { PictureService } from '../../../providers/picture.service';
import { UsersDataService } from '../../../providers/users-data.service';
import { Cloudinary } from '../models/cloudinary.model';
import { UpdateUserPic } from '../actions/user.actions';

@Injectable()
export class PictureEffects {
  @Effect()
  saveImg$ = this.actions$.pipe(
    ofType<SavePicture>(PictureActionTypes.SavePicture),
    map(action => action.payload),
    exhaustMap(savePic =>
      this.user.updateUser(savePic).pipe(
        map(() => {
          new UpdateUserPic(savePic);
          new UnloadPicture();
        }),
        catchError(() => of(new UnloadPicture()))
      )
    )
  );

  @Effect()
  uploadImg$ = this.actions$.pipe(
    ofType<UploadPicture>(PictureActionTypes.UploadPicture),
    map(action => action.payload),
    exhaustMap(upload =>
      this.picture.uploadImg(upload).pipe(
        map((res: Cloudinary) => new SavePicture({ photoUrl: res.secure_url })),
        catchError(() => of(new UnloadPicture()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private picture: PictureService,
    private user: UsersDataService
  ) {}
}
