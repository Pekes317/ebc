import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { State as RootState } from '../../reducers';
import * as fromData from './form-data.reducer';
import * as fromState from './form-state.reducer';
import * as fromTemps from './temp.reducer';

export interface State extends RootState {
  formState: FormStore;
}

export interface FormStore {
  data: fromData.State;
  status: fromState.State;
  temps: fromTemps.State;
}

export const reducers: ActionReducerMap<FormStore> = {
  data: fromData.reducer,
  status: fromState.reducer,
  temps: fromTemps.reducer,
};

export const metaReducers: MetaReducer<FormStore>[] = !environment.production
  ? []
  : [];

export const selectFormState = createFeatureSelector<FormStore>('formStore');

export const selectStatus = createSelector(
  selectFormState,
  (state: FormStore) => state.status,
);

export const selectData = createSelector(
  selectFormState,
  (state: FormStore) => state.data,
);

export const selectTemps = createSelector(
  selectFormState,
  (state: FormStore) => state.temps,
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromTemps.adapter.getSelectors(selectTemps);
