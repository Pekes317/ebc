import { Injectable } from '@angular/core';
import { Actions, Effect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';

import {
  AppSettingActionTypes,
  LoadAppSettings,
  NotifyAppSetting,
} from '../actions/app-setting.actions';
import { UsersDataService } from '../../providers/users-data.service';

@Injectable()
export class AppSettingEffect {
  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => new LoadAppSettings()),
  );

  @Effect()
  loadSetting$ = this.actions$.pipe(
    ofType<LoadAppSettings>(AppSettingActionTypes.LoadAppSettings),
    exhaustMap(() =>
      this.userService
        .checkDevice()
        .then(notify => new NotifyAppSetting(notify)),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UsersDataService,
  ) {}
}
