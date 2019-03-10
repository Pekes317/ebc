import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouter from '@ngrx/router-store';

import * as fromAppSetting from './app-setting.reducer';
import { environment } from '../../../environments/environment';
import { RouterState } from '../shared/router-state-util';

export interface State {
  app: fromAppSetting.State;
  router: fromRouter.RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<State> = {
  app: fromAppSetting.reducer,
  router: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

export const routerState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterState>
>('router');

export const getRouter = createSelector(
  routerState,
  (route: fromRouter.RouterReducerState<RouterState>) => route.state,
);
