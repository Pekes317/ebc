import { Item } from './../../item-store/models/item.model';
import { Action } from '@ngrx/store';
import { State } from '../reducers/form-data.reducer';

export enum FormDataActionTypes {
  CompleteFormData = '[FormData] CompleteFprmData',
  ErrorFormData = '[FormData] Error FormData',
  ResetFormData = '[FormData] Reset FormData',
  SaveFormData = '[FormData] Save FormData',
  UpdateFormData = '[FormData] Update FormData',
}

export class CompleteFormData implements Action {
  readonly type = FormDataActionTypes.CompleteFormData;
}

export class ErrorFormData implements Action {
  readonly type = FormDataActionTypes.ErrorFormData;

  constructor(public payload: unknown) {}
}

export class ResetFormData implements Action {
  readonly type = FormDataActionTypes.ResetFormData;
}

export class SaveFormData implements Action {
  readonly type = FormDataActionTypes.SaveFormData;

  constructor(public payload: Partial<Item>) {}
}

export class UpdateFormData implements Action {
  readonly type = FormDataActionTypes.UpdateFormData;

  constructor(public payload: Partial<State>) {}
}

export type FormDataActions =
  | CompleteFormData
  | ErrorFormData
  | ResetFormData
  | SaveFormData
  | UpdateFormData;
