import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Item } from '../models/item.model';
import { FlyerActions, FlyerActionTypes } from '../actions/flyer.actions';
import { selectFlyers } from './items.selectors';

export interface State extends EntityState<Item> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: FlyerActions
): State {
  switch (action.type) {
    case FlyerActionTypes.AddFlyer: {
      return adapter.addOne(action.payload.flyer, state);
    }

    case FlyerActionTypes.UpsertFlyer: {
      return adapter.upsertOne(action.payload.flyer, state);
    }

    case FlyerActionTypes.AddFlyers: {
      return adapter.addMany(action.payload.flyers, state);
    }

    case FlyerActionTypes.UpsertFlyers: {
      return adapter.upsertMany(action.payload.flyers, state);
    }

    case FlyerActionTypes.UpdateFlyer: {
      return adapter.updateOne(action.payload.flyer, state);
    }

    case FlyerActionTypes.UpdateFlyers: {
      return adapter.updateMany(action.payload.flyers, state);
    }

    case FlyerActionTypes.DeleteFlyer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case FlyerActionTypes.DeleteFlyers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case FlyerActionTypes.LoadFlyers: {
      return adapter.addAll(action.payload.flyers, state);
    }

    case FlyerActionTypes.ClearFlyers: {
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
} = adapter.getSelectors(selectFlyers);
