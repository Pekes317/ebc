import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { State as RootState } from '../../reducers';
import * as fromPic from './picture.reducer';
import * as fromUser from './user.reducer';

export interface State extends RootState {
  current: UserState;
}

export interface UserState {
  picture: fromPic.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<UserState> = {
  picture: fromPic.reducer,
  user: fromUser.reducer
};

export const metaReducers: MetaReducer<UserState>[] = !environment.production
  ? []
  : [];

export const selectUserState = createFeatureSelector<UserState>('userStore');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

export const selectPic = createSelector(
  selectUserState,
  (state: UserState) => state.picture
);
