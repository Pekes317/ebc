import {
  AppSettingActions,
  AppSettingActionTypes,
} from '../actions/app-setting.actions';

export interface State {
  notify: boolean;
}

export const initialState: State = {
  notify: false,
};

export function reducer(
  state = initialState,
  action: AppSettingActions,
): State {
  switch (action.type) {
    case AppSettingActionTypes.NotifyAppSetting:
      return { ...state, notify: action.payload };

    default:
      return state;
  }
}
