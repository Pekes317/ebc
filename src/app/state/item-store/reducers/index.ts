import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../../../environments/environment';
import * as fromCards from './card.reducer';
import * as fromFlyers from './flyer.reducer';
import * as fromItem from './item.reducer';
import * as fromRoot from '../../reducers';
import * as selectors from './items.selectors';

export interface ItemState {
  currentCards: fromCards.State;
  currentFylers: fromFlyers.State;
  currentItem: fromItem.State
}

export interface State extends fromRoot.State {
  itemStore: ItemState;
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