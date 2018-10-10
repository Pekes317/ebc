import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Item } from '../models/item.model';

export enum CardActionTypes {
  LoadCards = '[Card] Load Cards',
  AddCard = '[Card] Add Card',
  UpsertCard = '[Card] Upsert Card',
  AddCards = '[Card] Add Cards',
  UpsertCards = '[Card] Upsert Cards',
  UpdateCard = '[Card] Update Card',
  UpdateCards = '[Card] Update Cards',
  DeleteCard = '[Card] Delete Card',
  DeleteCards = '[Card] Delete Cards',
  ClearCards = '[Card] Clear Cards'
}

export class LoadCards implements Action {
  readonly type = CardActionTypes.LoadCards;

  constructor(public payload: { cards: Item[] }) {}
}

export class AddCard implements Action {
  readonly type = CardActionTypes.AddCard;

  constructor(public payload: { card: Item }) {}
}

export class UpsertCard implements Action {
  readonly type = CardActionTypes.UpsertCard;

  constructor(public payload: { card: Item }) {}
}

export class AddCards implements Action {
  readonly type = CardActionTypes.AddCards;

  constructor(public payload: { cards: Item[] }) {}
}

export class UpsertCards implements Action {
  readonly type = CardActionTypes.UpsertCards;

  constructor(public payload: { cards: Item[] }) {}
}

export class UpdateCard implements Action {
  readonly type = CardActionTypes.UpdateCard;

  constructor(public payload: { card: Update<Item> }) {}
}

export class UpdateCards implements Action {
  readonly type = CardActionTypes.UpdateCards;

  constructor(public payload: { cards: Update<Item>[] }) {}
}

export class DeleteCard implements Action {
  readonly type = CardActionTypes.DeleteCard;

  constructor(public payload: { id: number }) {}
}

export class DeleteCards implements Action {
  readonly type = CardActionTypes.DeleteCards;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearCards implements Action {
  readonly type = CardActionTypes.ClearCards;
}

export type CardActions =
 LoadCards
 | AddCard
 | UpsertCard
 | AddCards
 | UpsertCards
 | UpdateCard
 | UpdateCards
 | DeleteCard
 | DeleteCards
 | ClearCards;
