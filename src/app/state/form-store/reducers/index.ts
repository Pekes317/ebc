import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { State as RootState } from '../../reducers';
import * as fromState from './form-state.reducer';

export interface State extends RootState {
  formState: FormStore;
}

export interface FormStore {
  status: fromState.State;
}

export const reducers: ActionReducerMap<FormStore> = {
  status: fromState.reducer
};

export const metaReducers: MetaReducer<FormStore>[] = !environment.production
  ? []
  : [];

export const selectFormState = createFeatureSelector<FormStore>('formStore');

export const selectStatus = createSelector(
  selectFormState,
  (state: FormStore) => state.status
);
