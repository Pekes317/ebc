import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Item } from '../models/item.model';

export enum FlyerActionTypes {
  LoadFlyers = '[Flyer] Load Flyers',
  AddFlyer = '[Flyer] Add Flyer',
  UpsertFlyer = '[Flyer] Upsert Flyer',
  AddFlyers = '[Flyer] Add Flyers',
  UpsertFlyers = '[Flyer] Upsert Flyers',
  UpdateFlyer = '[Flyer] Update Flyer',
  UpdateFlyers = '[Flyer] Update Flyers',
  DeleteFlyer = '[Flyer] Delete Flyer',
  DeleteFlyers = '[Flyer] Delete Flyers',
  ClearFlyers = '[Flyer] Clear Flyers'
}

export class LoadFlyers implements Action {
  readonly type = FlyerActionTypes.LoadFlyers;

  constructor(public payload: { flyers: Item[] }) {}
}

export class AddFlyer implements Action {
  readonly type = FlyerActionTypes.AddFlyer;

  constructor(public payload: { flyer: Item }) {}
}

export class UpsertFlyer implements Action {
  readonly type = FlyerActionTypes.UpsertFlyer;

  constructor(public payload: { flyer: Item }) {}
}

export class AddFlyers implements Action {
  readonly type = FlyerActionTypes.AddFlyers;

  constructor(public payload: { flyers: Item[] }) {}
}

export class UpsertFlyers implements Action {
  readonly type = FlyerActionTypes.UpsertFlyers;

  constructor(public payload: { flyers: Item[] }) {}
}

export class UpdateFlyer implements Action {
  readonly type = FlyerActionTypes.UpdateFlyer;

  constructor(public payload: { flyer: Update<Item> }) {}
}

export class UpdateFlyers implements Action {
  readonly type = FlyerActionTypes.UpdateFlyers;

  constructor(public payload: { flyers: Update<Item>[] }) {}
}

export class DeleteFlyer implements Action {
  readonly type = FlyerActionTypes.DeleteFlyer;

  constructor(public payload: { id: number }) {}
}

export class DeleteFlyers implements Action {
  readonly type = FlyerActionTypes.DeleteFlyers;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearFlyers implements Action {
  readonly type = FlyerActionTypes.ClearFlyers;
}

export type FlyerActions =
 LoadFlyers
 | AddFlyer
 | UpsertFlyer
 | AddFlyers
 | UpsertFlyers
 | UpdateFlyer
 | UpdateFlyers
 | DeleteFlyer
 | DeleteFlyers
 | ClearFlyers;
