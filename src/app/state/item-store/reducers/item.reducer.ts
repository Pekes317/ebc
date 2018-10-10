import { ItemActions, ItemActionTypes } from '../actions/item.actions';
import { Item } from '../models/item.model';

export interface State {
  base: Item;
  svg: string;
}

export const initialState: State = {
  base: {
    id: null,
    name: '',
    desc: '',
    media: '',
    pic: '',
    flyer: false,
    ready: false,
    disable: false
  },
  svg: ''
};

export function reducer(state = initialState, action: ItemActions): State {
  switch (action.type) {
    case ItemActionTypes.AddItem:
      return { ...state, base: action.payload };

    case ItemActionTypes.LoadMedia:
       return { ...state, svg: action.payload };

    default:
      return state;
  }
}
