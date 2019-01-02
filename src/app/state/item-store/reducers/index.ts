import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import { State as RootState } from '../../reducers';
import * as fromCards from './card.reducer';
import * as fromFlyers from './flyer.reducer';
import * as fromItem from './item.reducer';
import * as selectors from './items.selectors';

export interface State extends RootState {
  itemStore: ItemState;
}

export interface ItemState {
  currentCards: fromCards.State;
  currentFylers: fromFlyers.State;
  currentItem: fromItem.State;
}

export const reducers: ActionReducerMap<ItemState> = {
  currentCards: fromCards.reducer,
  currentFylers: fromFlyers.reducer,
  currentItem: fromItem.reducer
};

export const metaReducers: MetaReducer<ItemState>[] = !environment.production
  ? []
  : [];

export const { selectItemStore, selectCards, selectFlyers } = selectors;

export const selectItem = createSelector(
  selectItemStore,
  (state: ItemState) => state.currentItem.base
);

export const selectSvg = createSelector(
  selectItemStore,
  (state: ItemState) => state.currentItem.svg
);
