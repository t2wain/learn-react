export enum ListActionTypes {
  DEL_ITEM = "DEL_ITEM",
  TOG_ITEM = "TOG_ITEM",
  ADD_ITEM_BEGIN = "ADD_ITEM_BEGIN",
  ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS",
  ADD_ITEM_ERROR = "ADD_ITEM_ERROR",
  LOAD_ITEM_BEGIN = "LOAD_ITEM_BEGIN",
  LOAD_ITEM_SUCCESS = "LOAD_ITEM_SUCCESS",
  LOAD_ITEM_ERROR = "LOAD_ITEM_ERROR"
}

export enum ListStatus {
  BEGIN = "BEGIN",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR"
}

export interface IList {
  status: ListStatus;
  errMsg: string;
  items: IItem[];
}

export interface IItem {
  id?: number;
  name: string;
  checked: boolean;
}

export interface IListAddItemBeginAction {
  type: ListActionTypes.ADD_ITEM_BEGIN;
}

export interface IListAddItemSuccessAction {
  type: ListActionTypes.ADD_ITEM_SUCCESS;
  item: IItem;
}

export interface IListAddItemErrorAction {
  type: ListActionTypes.ADD_ITEM_ERROR;
  errmsg: string;
}

export interface IListDelItemAction {
  type: ListActionTypes.DEL_ITEM;
  itemId: number;
}

export interface IListToggleItemAction {
  type: ListActionTypes.TOG_ITEM;
  itemId: number;
}

export interface IListLoadItemBeginAction {
  type: ListActionTypes.LOAD_ITEM_BEGIN;
}

export interface IListLoadItemSuccessAction {
  type: ListActionTypes.LOAD_ITEM_SUCCESS;
  items: string[];
}

export interface IListLoadItemErrorAction {
  type: ListActionTypes.LOAD_ITEM_ERROR;
  errmsg: string;
}

export type ListActions =
  | IListAddItemBeginAction
  | IListAddItemSuccessAction
  | IListAddItemErrorAction
  | IListDelItemAction
  | IListToggleItemAction
  | IListLoadItemBeginAction
  | IListLoadItemSuccessAction
  | IListLoadItemErrorAction;
