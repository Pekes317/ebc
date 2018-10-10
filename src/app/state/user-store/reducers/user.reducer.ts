import { UserActions, UserActionTypes } from '../actions/user.actions';

export interface State {
  displayName: string;
  email: string;
  photoUrl: string;
  token: string;
}

export const initialState: State = {
  displayName: '',
  email: '',
  photoUrl: './assets/img/user.svg',
  token: ''
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUser:
      return { ...action.payload };

    case UserActionTypes.LogoutUser:
      return state;

    case UserActionTypes.UpdateUserName:
      return { ...state, displayName: action.payload.displayName };

    case UserActionTypes.UpdateUserPic:
      return { ...state, photoUrl: action.payload.photoUrl };

    default:
      return state;
  }
}
