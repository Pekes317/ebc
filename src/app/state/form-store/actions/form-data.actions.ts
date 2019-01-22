import { Action } from '@ngrx/store';
import { State } from '../reducers/form-data.reducer';

export enum FormDataActionTypes {
  ResetFormData = '[FormData] Reset FormData',
  UpdateFormData = '[FormData] Update FormData',
}

export class ResetFormData implements Action {
  readonly type = FormDataActionTypes.ResetFormData;
}

export class UpdateFormData implements Action {
  readonly type = FormDataActionTypes.UpdateFormData;

  constructor(public payload: Partial<State>) {}
}

export type FormDataActions = ResetFormData | UpdateFormData;
