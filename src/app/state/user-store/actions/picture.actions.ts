import { Action } from '@ngrx/store';
import { UploadImg } from '../../../models/app.model';

export enum PictureActionTypes {
  LoadPicture = '[Picture] Load Picture',
  SavePicture = '[Picture] Save Picture',
  UnloadPicture = '[Picture] Unload Picture',
  UploadPicture = '[Picture] Upload Picture',
}

export class LoadPicture implements Action {
  readonly type = PictureActionTypes.LoadPicture;

  constructor(public payload: { newPic: boolean, picFile: string }) {}
}

export class SavePicture implements Action {
  readonly type = PictureActionTypes.SavePicture;

  constructor(public payload: { photoUrl: string }) {}
}

export class UnloadPicture implements Action {
  readonly type = PictureActionTypes.UnloadPicture;
}

export class UploadPicture implements Action {
  readonly type = PictureActionTypes.UploadPicture;

  constructor(public payload: UploadImg) {}
}

export type PictureActions = LoadPicture | UnloadPicture | UploadPicture;
