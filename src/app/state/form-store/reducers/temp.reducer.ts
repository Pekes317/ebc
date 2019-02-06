import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { TempActions, TempActionTypes } from '../actions/temp.actions';
import { Item } from '../../item-store/models/item.model';

export interface State extends EntityState<Item> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(state = initialState, action: TempActions): State {
  switch (action.type) {
    case TempActionTypes.AddTemp: {
      return adapter.addOne(action.payload.temp, state);
    }

    case TempActionTypes.UpsertTemp: {
      return adapter.upsertOne(action.payload.temp, state);
    }

    case TempActionTypes.AddTemps: {
      return adapter.addMany(action.payload.temps, state);
    }

    case TempActionTypes.UpsertTemps: {
      return adapter.upsertMany(action.payload.temps, state);
    }

    case TempActionTypes.UpdateTemp: {
      return adapter.updateOne(action.payload.temp, state);
    }

    case TempActionTypes.UpdateTemps: {
      return adapter.updateMany(action.payload.temps, state);
    }

    case TempActionTypes.DeleteTemp: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TempActionTypes.DeleteTemps: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TempActionTypes.LoadTemps: {
      return adapter.addAll(action.payload.temps, state);
    }

    case TempActionTypes.ClearTemps: {
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
} = adapter.getSelectors();
