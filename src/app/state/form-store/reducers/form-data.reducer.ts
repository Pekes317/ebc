import {
  FormDataActions,
  FormDataActionTypes,
} from '../actions/form-data.actions';

export interface State {
  desc: string;
  details: string;
  email: string;
  name: string;
  phone: string;
  pic: string;
  socials: string[];
  tempName: string;
  tempPic: string;
  title: string;
}

export const initialState: State = {
  desc: '',
  details: '',
  email: '',
  name: '',
  phone: '',
  pic: '',
  socials: [],
  tempName: '',
  tempPic: '',
  title: '',
};

export function reducer(state = initialState, action: FormDataActions): State {
  switch (action.type) {
    case FormDataActionTypes.UpdateFormData:
      return { ...state, ...action.payload };

    case FormDataActionTypes.ResetFormData:
      return initialState;

    default:
      return state;
  }
}
