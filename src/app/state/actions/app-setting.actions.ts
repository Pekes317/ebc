import { Action } from '@ngrx/store';

export enum AppSettingActionTypes {
  LoadAppSettings = '[AppSetting] Load AppSettings',
  NotifyAppSetting = '[AppSetting] Notify AppSettings',
}

export class LoadAppSettings implements Action {
  readonly type = AppSettingActionTypes.LoadAppSettings;
}

export class NotifyAppSetting implements Action {
  readonly type = AppSettingActionTypes.NotifyAppSetting;

  constructor(public payload: boolean) {}
}

export type AppSettingActions = LoadAppSettings | NotifyAppSetting;
