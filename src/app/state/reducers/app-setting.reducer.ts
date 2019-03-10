import { DeeplinkMatch } from '@ionic-native/deeplinks/ngx';

import {
  AppSettingActions,
  AppSettingActionTypes,
} from '../actions/app-setting.actions';

export interface State {
  deepLink: DeeplinkMatch | null;
  notify: boolean;
}

export const initialState: State = {
  deepLink: null,
  notify: false,
};

export function reducer(
  state = initialState,
  action: AppSettingActions,
): State {
  switch (action.type) {
    case AppSettingActionTypes.DeepLinkAppSetting:
      return { ...state, deepLink: action.payload };

    case AppSettingActionTypes.NotifyAppSetting:
      return { ...state, notify: action.payload };

    default:
      return state;
  }
}
