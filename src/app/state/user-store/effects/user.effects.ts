import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  CreateUser,
  ErrorUser,
  LoginUser,
  LogoutUser,
  RedirectUser,
  UserActionTypes
} from '../actions/user.actions';
import { AuthService } from '../../../providers/auth.service';

@Injectable()
export class UserEffects {
  @Effect({ dispatch: false })
  create$ = this.actions$.pipe(
    ofType<CreateUser>(UserActionTypes.CreateUser),
    map(action => action.payload),
    exhaustMap(user =>
      this.authUser.createUser(user).pipe(
        map(() =>
          this.authUser.accountMade('Congrats your account has been Created!')
        ),
        catchError(err => of(this.authUser.accountMade(err.error.message)))
      )
    )
  );

  @Effect({ dispatch: false })
  error$ = this.actions$.pipe(
    ofType<ErrorUser>(UserActionTypes.ErrorUser),
    tap(() => (this.authUser.isAuthError = true))
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginUser>(UserActionTypes.LoginUser),
    map(action => action.payload),
    exhaustMap(user =>
      this.authUser.login(user.username, user.password).pipe(
        map(() => new RedirectUser('/sidemenu')),
        catchError(() => of(new ErrorUser()))
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<LogoutUser>(UserActionTypes.LogoutUser),
    map(action => action.type),
    map(() => new RedirectUser('/login')),
    tap(() => this.authUser.logout())
  );

  @Effect({ dispatch: false })
  redirect$ = this.actions$.pipe(
    ofType<RedirectUser>(UserActionTypes.RedirectUser),
    map(action => action.payload),
    tap(url => this.nav.navigateRoot(url))
  );

  constructor(
    private actions$: Actions,
    private authUser: AuthService,
    private nav: NavController
  ) {}
}
