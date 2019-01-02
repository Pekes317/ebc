import { Action } from '@ngrx/store';

export enum FormStateActionTypes {
  ResetState = '[FormState] ResetState'
}

export class ResetState implements Action {
  readonly type = FormStateActionTypes.ResetState;
}

export type FormStateActions = ResetState;
