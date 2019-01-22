import { Action } from '@ngrx/store';
import { State } from '../reducers/form-state.reducer';

export enum FormStateActionTypes {
  ResetFormState = '[FormState] ResetFormState',
  UpdateFormState = '[FormState] UpdateFormState',
}

export class ResetFormState implements Action {
  readonly type = FormStateActionTypes.ResetFormState;
}

export class UpdateFormState implements Action {
  readonly type = FormStateActionTypes.UpdateFormState;

  constructor(public payload: Partial<State>) {}
}

export type FormStateActions = ResetFormState | UpdateFormState;
