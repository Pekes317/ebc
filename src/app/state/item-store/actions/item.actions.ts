import { Action } from '@ngrx/store';
import { Item } from '../models/item.model';
import { ItemType } from '../../../util/item-type.enum';

export enum ItemActionTypes {
  LoadItems = '[Item] Load Items',
  AddItem = '[Item] Add Item',
  ErrorItems = '[Item] Error Items',
  GetItems = '[Item] Get Items',
  GetItem = '[Item] Get Item',
  GetMedia = '[Item] Get Media',
  DeleteItem = '[Item] Delete Item',
  LoadMedia = '[Item] Load Media',
}

export class LoadItems implements Action {
  readonly type = ItemActionTypes.LoadItems;

  constructor(public payload: { items: Item[] }) {}
}

export class AddItem implements Action {
  readonly type = ItemActionTypes.AddItem;

  constructor(public payload: Item) {}
}

export class ErrorItems implements Action {
  readonly type = ItemActionTypes.ErrorItems;

  constructor(public payload: unknown) {}
}

export class GetItem implements Action {
  readonly type = ItemActionTypes.GetItem;

  constructor(public payload: { id: number }) {}
}

export class GetItems implements Action {
  readonly type = ItemActionTypes.GetItems;

  constructor(public payload: { list: string; form: ItemType }) {}
}

export class GetMedia implements Action {
  readonly type = ItemActionTypes.GetMedia;

  constructor(public payload: string) {}
}

export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DeleteItem;

  constructor(public payload: { id: number; form: string }) {}
}

export class LoadMedia implements Action {
  readonly type = ItemActionTypes.LoadMedia;

  constructor(public payload: string) {}
}

export type ItemActions =
  | LoadItems
  | AddItem
  | ErrorItems
  | GetItem
  | GetItems
  | GetMedia
  | DeleteItem
  | LoadMedia;
