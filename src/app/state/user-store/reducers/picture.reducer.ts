import { PictureActions, PictureActionTypes } from '../actions/picture.actions';

export interface State {
  newPic: boolean;
  picFile: string;
}

export const initialState: State = {
  newPic: false,
  picFile: ''
};

export function reducer(state = initialState, action: PictureActions): State {
  switch (action.type) {
    case PictureActionTypes.LoadPicture:
      return { ...action.payload };

    case PictureActionTypes.UnloadPicture:
      return state;

    default:
      return state;
  }
}
