import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Item } from '../models/item.model';
import { CardActions, CardActionTypes } from '../actions/card.actions';
import { selectCards } from './items.selectors';

export interface State extends EntityState<Item> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CardActions
): State {
  switch (action.type) {
    case CardActionTypes.AddCard: {
      return adapter.addOne(action.payload.card, state);
    }

    case CardActionTypes.UpsertCard: {
      return adapter.upsertOne(action.payload.card, state);
    }

    case CardActionTypes.AddCards: {
      return adapter.addMany(action.payload.cards, state);
    }

    case CardActionTypes.UpsertCards: {
      return adapter.upsertMany(action.payload.cards, state);
    }

    case CardActionTypes.UpdateCard: {
      return adapter.updateOne(action.payload.card, state);
    }

    case CardActionTypes.UpdateCards: {
      return adapter.updateMany(action.payload.cards, state);
    }

    case CardActionTypes.DeleteCard: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CardActionTypes.DeleteCards: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CardActionTypes.LoadCards: {
      return adapter.addAll(action.payload.cards, state);
    }

    case CardActionTypes.ClearCards: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectCards);
