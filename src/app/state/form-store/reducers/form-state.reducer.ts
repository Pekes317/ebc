import {
  FormStateActions,
  FormStateActionTypes,
} from '../actions/form-state.actions';
import { ItemCat } from '../../../util/item-cat.enum';
import { ItemType } from '../../../util/item-type.enum';

export interface State {
  cat: ItemCat | null;
  hasPic: boolean;
  social: boolean;
  type: ItemType;
}

export const initialState: State = {
  cat: null,
  hasPic: false,
  social: false,
  type: ItemType.card,
};

export function reducer(state = initialState, action: FormStateActions): State {
  switch (action.type) {
    case FormStateActionTypes.UpdateFormState:
      return { ...state, ...action.payload };

    case FormStateActionTypes.ResetFormState:
      return initialState;

    default:
      return state;
  }
}
