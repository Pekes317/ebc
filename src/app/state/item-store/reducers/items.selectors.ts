import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ItemState } from './index';

export const selectItemStore = createFeatureSelector<ItemState>('itemStore');

export const selectCards = createSelector(
  selectItemStore,
  (state: ItemState) => state.currentCards
);

export const selectFlyers = createSelector(
  selectItemStore,
  (state: ItemState) => state.currentFylers
);
