import { Action } from '@ngrx/store';

import { AuthUser, NewUser } from '../../../models/user.model';

export enum UserActionTypes {
  CreateUser = '[User] Create User',
  ErrorUser = '[User] Error User',
  LoadUser = '[User] Load User',
  LoginUser = '[User] Login User',
  LogoutUser = '[User] Logout User',
  RedirectUser = '[User] Redirect User',
  UpdateUserName = '[User] Update User Name',
  UpdateUserPic = '[User] Update User Picture'
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;

  constructor(public payload: NewUser) {}
}

export class ErrorUser implements Action {
  readonly type = UserActionTypes.ErrorUser;
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;

  constructor(public payload: AuthUser) {}
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.LoginUser;

  constructor(public payload: { username: string; password: string }) {}
}

export class LogoutUser implements Action {
  readonly type = UserActionTypes.LogoutUser;
}

export class RedirectUser implements Action {
  readonly type = UserActionTypes.RedirectUser;

  constructor(public payload: string) {}
}

export class UpdateUserName implements Action {
  readonly type = UserActionTypes.UpdateUserName;

  constructor(public payload: { displayName: string }) {}
}

export class UpdateUserPic implements Action {
  readonly type = UserActionTypes.UpdateUserPic;

  constructor(public payload: { photoUrl: string }) {}
}

export type UserActions =
  | CreateUser
  | ErrorUser
  | LoadUser
  | LoginUser
  | LogoutUser
  | RedirectUser
  | UpdateUserName
  | UpdateUserPic;
