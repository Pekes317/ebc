import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Item } from '../../item-store/models/item.model';
import { ItemType } from '../../../util/item-type.enum';

export enum TempActionTypes {
  AddTemp = '[Temp] Add Temp',
  AddTemps = '[Temp] Add Temps',
  ClearTemps = '[Temp] Clear Temps',
  DeleteTemp = '[Temp] Delete Temp',
  DeleteTemps = '[Temp] Delete Temps',
  ErrorTemps = '[Temp] Error Temps',
  GetTemps = '[Temp] GetTemps',
  LoadTemps = '[Temp] Load Temps',
  UpsertTemp = '[Temp] Upsert Temp',
  UpsertTemps = '[Temp] Upsert Temps',
  UpdateTemp = '[Temp] Update Temp',
  UpdateTemps = '[Temp] Update Temps',
}

export class AddTemp implements Action {
  readonly type = TempActionTypes.AddTemp;

  constructor(public payload: { temp: Item }) {}
}

export class AddTemps implements Action {
  readonly type = TempActionTypes.AddTemps;

  constructor(public payload: { temps: Item[] }) {}
}

export class ClearTemps implements Action {
  readonly type = TempActionTypes.ClearTemps;
}

export class DeleteTemp implements Action {
  readonly type = TempActionTypes.DeleteTemp;

  constructor(public payload: { id: number }) {}
}

export class DeleteTemps implements Action {
  readonly type = TempActionTypes.DeleteTemps;

  constructor(public payload: { ids: number[] }) {}
}

export class ErrorTemps implements Action {
  readonly type = TempActionTypes.ErrorTemps;

  constructor(public payload: unknown) {}
}

export class GetTemps implements Action {
  readonly type = TempActionTypes.GetTemps;

  constructor(public payload: ItemType) {}
}

export class LoadTemps implements Action {
  readonly type = TempActionTypes.LoadTemps;

  constructor(public payload: { temps: Item[] }) {}
}

export class UpsertTemp implements Action {
  readonly type = TempActionTypes.UpsertTemp;

  constructor(public payload: { temp: Item }) {}
}

export class UpsertTemps implements Action {
  readonly type = TempActionTypes.UpsertTemps;

  constructor(public payload: { temps: Item[] }) {}
}

export class UpdateTemp implements Action {
  readonly type = TempActionTypes.UpdateTemp;

  constructor(public payload: { temp: Update<Item> }) {}
}

export class UpdateTemps implements Action {
  readonly type = TempActionTypes.UpdateTemps;

  constructor(public payload: { temps: Update<Item>[] }) {}
}

export type TempActions =
  | LoadTemps
  | AddTemp
  | UpsertTemp
  | AddTemps
  | UpsertTemps
  | UpdateTemp
  | UpdateTemps
  | DeleteTemp
  | DeleteTemps
  | ClearTemps;
